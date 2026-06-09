// src/lib/services/lead.service.ts
import { LeadRepository } from "../repositories/lead.repository";
import { prisma } from "@/lib/prisma";

export class LeadService {
  static async updateFullLead(id: string, data: any) {
    const existingLead = await LeadRepository.findById(id);
    if (!existingLead) throw new Error("Lead not found");

    // 1. Perform the update
    const updatedLead = await LeadRepository.updateFull(id, data);

    // 2. Log to Activity Table (Crucial for Phase 2)
    if (data.stage && data.stage !== existingLead.stage) {
      await prisma.activity.create({
        data: {
          leadId: id,
          type: "STAGE_CHANGE",
          oldStatus: existingLead.stage,
          newStatus: data.stage,
          note: `Lead moved from ${existingLead.stage} to ${data.stage}`,
          performedBy: "SYSTEM_USER" // Aap yahan user context add kar sakte ho
        }
      });
    }

    return updatedLead;
  }
}