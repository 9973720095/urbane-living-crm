import { prisma } from "@/lib/prisma";
import { LeadStage } from "@prisma/client";

export class LeadRepository {
  // =========================
  // BASIC METHODS (UNCHANGED BEHAVIOR)
  // =========================

  async getAll() {
    return prisma.lead.findMany({
      include: {
        assignedTo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getById(id: string) {
    return prisma.lead.findUnique({
      where: { id },
      include: {
        assignedTo: true,
        activities: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  }

  async updateStage(id: string, stage: LeadStage) {
    return prisma.lead.update({
      where: { id },
      data: {
        stage,
      },
    });
  }

  // =========================
  // 🔥 NEW: CRM CORE METHODS (POWER LAYER)
  // =========================

  async findMany(args: any) {
    return prisma.lead.findMany({
      ...args,
      include: {
        assignedTo: true,
      },
    });
  }

  async count(where: any) {
    return prisma.lead.count({ where });
  }

  // =========================
  // 🔥 OPTIONAL FUTURE READY METHODS
  // (AI CRM / Automation / Scaling)
  // =========================

  async updateLead(id: string, data: any) {
    return prisma.lead.update({
      where: { id },
      data,
    });
  }

  async createLead(data: any) {
    return prisma.lead.create({
      data,
    });
  }

  async deleteLead(id: string) {
    return prisma.lead.delete({
      where: { id },
    });
  }

  // Bulk update (useful for CRM actions)
  async bulkUpdate(where: any, data: any) {
    return prisma.lead.updateMany({
      where,
      data,
    });
  }
}