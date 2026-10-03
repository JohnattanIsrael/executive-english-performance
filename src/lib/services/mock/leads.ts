import { sampleLeads } from "@/mocks/admin";
import { toWebhookPayload } from "@/lib/crm/webhook";
import type { Lead } from "@/lib/types";
import { storage } from "@/lib/utils";
import type { LeadService } from "../contracts";

export const LOCAL_LEADS_KEY = "eep.leads.v1";
const webhookUrl = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL || "";

/**
 * Lead capture that works on static hosting:
 *  - If NEXT_PUBLIC_LEAD_WEBHOOK_URL is set, the lead is POSTed as flat, readable
 *    JSON (see toWebhookPayload) to Formspree, Zapier/Make, a CRM or your own API.
 *  - A copy is always kept in this browser so the demo /admin pipeline shows it.
 */
export const leadService: LeadService = {
  async submit(lead) {
    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(toWebhookPayload(lead)),
        });
        if (!res.ok) return { ok: false, error: "We couldn't send your request. Please try again or email us directly." };
      } catch {
        return { ok: false, error: "Network error. Please check your connection and try again." };
      }
    }
    const existing = storage.get<Lead[]>(LOCAL_LEADS_KEY, []);
    storage.set(LOCAL_LEADS_KEY, [lead, ...existing].slice(0, 200));
    return { ok: true, id: lead.id };
  },
  async list() {
    return [...storage.get<Lead[]>(LOCAL_LEADS_KEY, []), ...sampleLeads];
  },
};

export const isLeadWebhookConfigured = Boolean(webhookUrl);
