import { prisma } from "@/lib/prisma";
import { LeadStage } from "@prisma/client";

export class LeadRepository {
  // =========================
  // BASIC METHODS
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
  // CRM CORE METHODS
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
  // CREATE METHODS (Fixed for Service Layer)
  // =========================

  // Service layer mein .create() call ho raha hai, isliye ye alias zaroori hai
  async create(data: any) {
    return this.createLead(data);
  }

  async createLead(data: any) {
    return prisma.lead.create({
      data,
    });
  }

  // =========================
  // FUTURE READY METHODS
  // =========================

  async updateLead(id: string, data: any) {
    return prisma.lead.update({
      where: { id },
      data,
    });
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