import type { CreateLeadInput } from "@/lib/validators/lead.schema";

export const LeadRepository = {
  create(data: CreateLeadInput, tx: any) {
    return tx.lead.create({ data });
  }
};