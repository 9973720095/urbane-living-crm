import { prisma } from "@/lib/prisma";

export class ActivityRepository {
  async create(data: any) {
    return prisma.activity.create({
      data,
    });
  }

  async getLeadActivities(leadId: string) {
    return prisma.activity.findMany({
      where: {
        leadId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}