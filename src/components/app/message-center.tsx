"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import type { MessageThread } from "@/lib/types";
import { cn, formatDateTime, uid } from "@/lib/utils";

export function MessageCenter({ threads: initial, userId, userName }: { threads: MessageThread[]; userId: string; userName: string }) {
  const [threads, setThreads] = useState(initial);
  const [activeId, setActiveId] = useState(initial[0]?.id);
  const [draft, setDraft] = useState("");
  const active = threads.find((t) => t.id === activeId);

  async function send() {
    const body = draft.trim();
    if (!body || !active) return;
    await services.coaching.sendMessage(active.id, body);
    const message = { id: uid("msg"), authorId: userId, authorName: userName, body, sentAt: new Date().toISOString() };
    setThreads((ts) => ts.map((t) => (t.id === active.id ? { ...t, messages: [...t.messages, message], unread: 0 } : t)));
    setDraft("");
  }

  return (
    <div className="grid overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-[300px_1fr]">
      <ul className="border-b border-line md:border-r md:border-b-0" aria-label="Conversations">
        {threads.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => {
                setActiveId(t.id);
                setThreads((ts) => ts.map((x) => (x.id === t.id ? { ...x, unread: 0 } : x)));
              }}
              aria-current={t.id === activeId ? "true" : undefined}
              className={cn(
                "flex w-full flex-col items-start gap-1 border-b border-line px-5 py-4 text-left transition-colors",
                t.id === activeId ? "bg-paper" : "hover:bg-paper/60",
              )}
            >
              <span className="flex w-full items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-ink">{t.subject}</span>
                {t.unread > 0 && <span className="size-2 shrink-0 rounded-full bg-brass" aria-label="Unread" />}
              </span>
              <span className="line-clamp-1 text-xs text-muted">{t.messages.at(-1)?.body}</span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div className="flex min-h-[480px] flex-col">
          <div className="border-b border-line px-6 py-4">
            <h2 className="font-medium text-ink">{active.subject}</h2>
          </div>
          <ol className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
            {active.messages.map((m) => {
              const mine = m.authorId === userId;
              return (
                <li key={m.id} className={cn("flex flex-col", mine ? "items-end" : "items-start")}>
                  <span className="mb-1 text-xs text-muted">
                    {mine ? "You" : m.authorName} · {formatDateTime(m.sentAt)}
                  </span>
                  <p
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed",
                      mine ? "rounded-br-md bg-ink text-paper" : "rounded-bl-md bg-paper text-ink",
                    )}
                  >
                    {m.body}
                  </p>
                </li>
              );
            })}
          </ol>
          <form
            className="flex items-end gap-3 border-t border-line p-4"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write to your coach…"
              className="flex-1 resize-none rounded-xl border border-line-strong bg-paper px-4 py-3 text-[15px] focus:border-harbor-500 focus:outline-none"
            />
            <Button type="submit" disabled={!draft.trim()} aria-label="Send message">
              <Send className="size-4" aria-hidden />
            </Button>
          </form>
        </div>
      ) : (
        <p className="p-10 text-center text-muted">No conversations yet.</p>
      )}
    </div>
  );
}
