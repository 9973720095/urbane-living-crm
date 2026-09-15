import { prisma } from "@/lib/prisma";
import { LeadStage } from "@prisma/client";

export class LeadRepository {
  // Common include configuration for consistent data loading across API queries
  private defaultInclude = {
    assignedTo: true,
    callRecordings: {
      include: {
        employee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc" as const,
      },
    },
  };

  // =========================
  // BASIC METHODS
  // =========================

  async getAll() {
    return prisma.lead.findMany({
      include: this.defaultInclude,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getById(id: string) {
    return prisma.lead.findUnique({
      where: { id },
      include: {
        ...this.defaultInclude,
        activities: {
          orderBy: {
            createdAt: "desc",
          },
        },
        followups: {
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
        lead_status: stage,
      },
    });
  }

  // =========================
  // CRM CORE METHODS
  // =========================

  async findMany(args: any = {}) {
    const { include, ...restArgs } = args;

    return prisma.lead.findMany({
      ...restArgs,
      include: include || this.defaultInclude,
    });
  }

  async count(where: any = {}) {
    return prisma.lead.count({ where });
  }

  // =========================
  // CREATE METHODS
  // =========================

  async create(data: any) {
    return this.createLead(data);
  }

  async createLead(data: any) {
    return prisma.lead.create({
      data,
      include: this.defaultInclude,
    });
  }

  // =========================
  // UPDATE & DELETE METHODS
  // =========================

  async update(id: string, data: any) {
    return this.updateLead(id, data);
  }

  async updateLead(id: string, data: any) {
    return prisma.lead.update({
      where: { id },
      data,
      include: this.defaultInclude,
    });
  }

  async delete(id: string) {
    return this.deleteLead(id);
  }

  async deleteLead(id: string) {
    return prisma.lead.delete({
      where: { id },
    });
  }

  async bulkUpdate(where: any, data: any) {
    return prisma.lead.updateMany({
      where,
      data,
    });
  }
}