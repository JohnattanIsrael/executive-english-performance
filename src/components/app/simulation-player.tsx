"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, CircleAlert, Info, Mic, Send, Share2, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/primitives";
import { categoryLabels } from "@/content/marketing";
import { track } from "@/lib/analytics";
import { services } from "@/lib/services";
import type { Conversation, FeedbackReport, Scenario } from "@/lib/types";
import { cn, uid } from "@/lib/utils";
import { practiceHref } from "./scenario-card";

/**
 * Preview simulation. ConversationService returns scripted counterpart turns
 * and FeedbackService applies transparent text heuristics. The same component
 * will drive real AI role-play once those services are backed by models.
 */
export function SimulationPlayer({ scenario, allScenarios }: { scenario: Scenario; allScenarios: Scenario[] }) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [draft, setDraft] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [finished, setFinished] = useState(false);
  const [report, setReport] = useState<FeedbackReport | null>(null);
  const [shared, setShared] = useState(false);
  const [run, setRun] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    services.conversation.start(scenario.id).then((c) => {
      if (!cancelled) setConversation(c);
    });
    track("simulation_started", { scenarioId: scenario.id });
    return () => {
      cancelled = true;
    };
  }, [scenario.id, run]);

  function restart() {
    setConversation(null);
    setDraft("");
    setFinished(false);
    setReport(null);
    setShared(false);
    setRun((r) => r + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [conversation?.turns.length, waiting]);

  const userTurns = conversation?.turns.filter((t) => t.speaker === "user").length ?? 0;

  async function send() {
    const text = draft.trim();
    if (!text || !conversation || waiting || finished) return;
    const withUser: Conversation = {
      ...conversation,
      turns: [...conversation.turns, { id: uid("turn"), speaker: "user", text, at: new Date().toISOString() }],
    };
    setConversation(withUser);
    setDraft("");
    setWaiting(true);
    const reply = await services.conversation.respond(withUser, text);
    setWaiting(false);
    if (reply) setConversation({ ...withUser, turns: [...withUser.turns, reply] });
    else setFinished(true);
  }

  async function getFeedback() {
    if (!conversation) return;
    const ended = { ...conversation, endedAt: new Date().toISOString() };
    setFinished(true);
    const r = await services.feedback.analyze(ended);
    setReport(r);
    track("simulation_completed", { scenarioId: scenario.id, turns: userTurns });
  }

  const nextScenarios = report?.nextPractice.map((id) => allScenarios.find((s) => s.id === id)).filter((s) => s !== undefined) ?? [];

  return (
    <div>
      <Link href="/dashboard/practice" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft className="size-4" aria-hidden /> Practice
      </Link>

      <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-muted">{categoryLabels[scenario.category]} simulation</p>
          <h1 className="mt-1 font-serif text-3xl text-ink md:text-4xl">{scenario.title}</h1>
        </div>
        <Badge tone="caution" className="self-start md:self-auto">
          Preview — scripted counterpart
        </Badge>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="flex min-h-[520px] flex-col rounded-2xl border border-line bg-surface">
          <div className="border-b border-line px-5 py-4">
            <p className="text-sm text-ink-2">“{scenario.situation}”</p>
            <p className="mt-1 text-xs text-muted">You are speaking with: {scenario.counterpart}</p>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6" aria-live="polite">
            {conversation?.turns.map((turn) => (
              <div key={turn.id} className={cn("flex", turn.speaker === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed",
                    turn.speaker === "user" ? "rounded-br-md bg-ink text-paper" : "rounded-bl-md bg-paper text-ink",
                  )}
                >
                  {turn.speaker === "counterpart" && <p className="mb-1 text-xs text-muted">{scenario.counterpart}</p>}
                  {turn.text}
                </div>
              </div>
            ))}
            {waiting && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-paper px-4 py-3 text-sm text-muted">
                  <span className="sr-only">Counterpart is responding</span>
                  <span aria-hidden className="inline-flex gap-1">
                    <span className="size-1.5 animate-pulse rounded-full bg-faint" />
                    <span className="size-1.5 animate-pulse rounded-full bg-faint [animation-delay:150ms]" />
                    <span className="size-1.5 animate-pulse rounded-full bg-faint [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
            {finished && !report && (
              <p className="rounded-xl border border-dashed border-line-strong p-4 text-center text-sm text-muted">
                The conversation has ended. Request feedback to review your responses.
              </p>
            )}
            <div ref={endRef} />
          </div>

          {!report && (
            <div className="border-t border-line p-4">
              {!finished ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor="response" className="sr-only">
                    Your response
                  </label>
                  <textarea
                    id="response"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    rows={3}
                    placeholder="Type your response as you would say it…"
                    className="w-full resize-none rounded-xl border border-line-strong bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-faint focus:border-harbor-500 focus:outline-none"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-xs text-muted">
                      <button
                        type="button"
                        disabled
                        title="Voice practice is in development"
                        className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-muted opacity-70"
                      >
                        <Mic className="size-3.5" aria-hidden /> Voice — coming soon
                      </button>
                      <span className="hidden sm:inline">Ctrl/⌘ + Enter to send</span>
                    </span>
                    <div className="flex gap-2">
                      {userTurns > 0 && (
                        <Button variant="secondary" size="sm" onClick={getFeedback}>
                          <Square className="size-3" aria-hidden /> End & get feedback
                        </Button>
                      )}
                      <Button type="submit" size="sm" disabled={!draft.trim() || waiting}>
                        <Send className="size-3.5" aria-hidden /> Send
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <Button onClick={getFeedback} className="w-full">
                  Get feedback
                </Button>
              )}
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <p className="text-sm font-medium text-ink">Your objectives</p>
            <ol className="mt-3 flex flex-col gap-2.5">
              {scenario.objectives.map((o, i) => (
                <li key={o} className="flex gap-2.5 text-sm text-ink-2">
                  <span className="text-faint tabular-nums">{i + 1}.</span>
                  {o}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-5 text-[13px] leading-relaxed text-muted">
            <Info className="mb-2 size-4 text-harbor-500" aria-hidden />
            This preview uses a scripted counterpart and rule-based text signals. Realistic AI role-play, speech analysis
            and pronunciation feedback are in development.
          </div>
        </aside>
      </div>

      {report && (
        <section className="mt-8 rounded-2xl border border-line bg-surface p-6 md:p-8" aria-labelledby="feedback-title">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge tone="caution">Rule-based preview feedback — not an AI evaluation</Badge>
              <h2 id="feedback-title" className="mt-3 font-serif text-3xl text-ink">
                Feedback on this simulation
              </h2>
            </div>
            <Button variant={shared ? "secondary" : "primary"} size="sm" onClick={() => setShared(true)} disabled={shared}>
              <Share2 className="size-3.5" aria-hidden /> {shared ? "Shared with coach (demo)" : "Share with my coach"}
            </Button>
          </div>

          <dl className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {report.signals.map((s) => (
              <div key={s.label} className="rounded-xl bg-paper p-4">
                <dt className="text-xs text-muted">{s.label}</dt>
                <dd className="mt-1 text-xl font-semibold text-ink">{s.value}</dd>
                {s.hint && <dd className="mt-0.5 text-[11px] text-faint">{s.hint}</dd>}
              </div>
            ))}
          </dl>

          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {report.observations.map((o) => (
              <li key={o.id} className="rounded-xl border border-line p-5">
                <p className="flex items-center gap-2 text-sm font-medium text-ink">
                  {o.tone === "strength" ? (
                    <CheckCircle2 className="size-4 text-good" aria-hidden />
                  ) : (
                    <CircleAlert className="size-4 text-caution" aria-hidden />
                  )}
                  <span className="sr-only">{o.tone === "strength" ? "Strength:" : "Focus area:"}</span>
                  {o.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{o.detail}</p>
                {o.example && <p className="mt-3 border-l-2 border-line-strong pl-3 text-sm text-muted italic">“{o.example}”</p>}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-line pt-6">
            <p className="text-sm font-medium text-ink">Practice next</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {nextScenarios.map((s) => (
                <Link
                  key={s.id}
                  href={practiceHref(s.id)}
                  className="rounded-full border border-line-strong px-4 py-2 text-sm text-ink hover:border-ink"
                >
                  {s.title}
                </Link>
              ))}
              <button type="button" onClick={restart} className="rounded-full px-4 py-2 text-sm text-muted hover:text-ink">
                Repeat this scenario
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
