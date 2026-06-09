import { prisma } from "@/lib/prisma";

export class LeadRepository {
  static async updateFull(id: string, data: any) {
    return await prisma.lead.update({
      where: { id },
      data: {
        stage: data.stage,
        assignedToId: data.assignedToId,
        nextFollowUp: data.nextFollowUp ? new Date(data.nextFollowUp) : undefined,
        siteVisitDate: data.siteVisitDate ? new Date(data.siteVisitDate) : undefined,
        remarks: data.remarks,
      },
    });
  }

  static async findById(id: string) {
    return await prisma.lead.findUnique({ where: { id } });
  }
}