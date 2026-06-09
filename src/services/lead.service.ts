import { LeadRepository } from "@/repositories/lead.repository";
import { prisma } from "@/lib/prisma";
import type { CreateLeadInput } from "@/lib/validators/lead.schema";

export const LeadService = {
  async createLead(input: CreateLeadInput) {
    return prisma.$transaction(async (tx) => {
      const lead = await LeadRepository.create(input, tx);
      return lead;
    });
  }
};