import { prisma } from "@/lib/prisma";

export class TimelineRepository {
  async getLeadTimeline(leadId: string) {
    return prisma.lead.findUnique({
      where: {
        id: leadId,
      },
      include: {
        assignedTo: true,

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

        meetings: {
          orderBy: {
            createdAt: "desc",
          },
        },

        orders: {
          orderBy: {
            createdAt: "desc",
          },
        },

        tasks: {
          orderBy: {
            createdAt: "desc",
          },
        },

        media: {
          orderBy: {
            createdAt: "desc",
          },
        },

        callRecordings: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  }
}