import { prisma } from "@/lib/prisma";

export class LeadMediaRepository {
  /**
   * Create Media
   */
  async create(data: any) {
    return prisma.leadMedia.create({
      data,
      include: {
        lead: true,
        uploadedBy: true,
      },
    });
  }

  /**
   * Get Single Media
   */
  async getById(id: string) {
    return prisma.leadMedia.findUnique({
      where: {
        id,
      },
      include: {
        lead: true,
        uploadedBy: true,
      },
    });
  }

  /**
   * Get All Media of Lead
   */
  async getLeadMedia(leadId: string) {
    return prisma.leadMedia.findMany({
      where: {
        leadId,
      },
      include: {
        lead: true,
        uploadedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Photos
   */
  async getPhotos(leadId: string) {
    return prisma.leadMedia.findMany({
      where: {
        leadId,
        type: "PHOTO",
      },
      include: {
        uploadedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Videos
   */
  async getVideos(leadId: string) {
    return prisma.leadMedia.findMany({
      where: {
        leadId,
        type: "VIDEO",
      },
      include: {
        uploadedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Audio Recordings
   */
  async getAudios(leadId: string) {
    return prisma.leadMedia.findMany({
      where: {
        leadId,
        type: "AUDIO",
      },
      include: {
        uploadedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Documents
   */
  async getDocuments(leadId: string) {
    return prisma.leadMedia.findMany({
      where: {
        leadId,
        type: "DOCUMENT",
      },
      include: {
        uploadedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Latest Media
   */
  async getLatest(limit: number = 20) {
    return prisma.leadMedia.findMany({
      take: limit,
      include: {
        lead: true,
        uploadedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Update Media
   */
  async update(id: string, data: any) {
    return prisma.leadMedia.update({
      where: {
        id,
      },
      data,
      include: {
        lead: true,
        uploadedBy: true,
      },
    });
  }

  /**
   * Delete Media
   */
  async delete(id: string) {
    return prisma.leadMedia.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Count All Media of Lead
   */
  async count(leadId: string) {
    return prisma.leadMedia.count({
      where: {
        leadId,
      },
    });
  }

  /**
   * Dashboard Summary
   */
  async getSummary(leadId: string) {
    const [
      photos,
      videos,
      audios,
      documents,
    ] = await Promise.all([
      prisma.leadMedia.count({
        where: {
          leadId,
          type: "PHOTO",
        },
      }),

      prisma.leadMedia.count({
        where: {
          leadId,
          type: "VIDEO",
        },
      }),

      prisma.leadMedia.count({
        where: {
          leadId,
          type: "AUDIO",
        },
      }),

      prisma.leadMedia.count({
        where: {
          leadId,
          type: "DOCUMENT",
        },
      }),
    ]);

    return {
      photos,
      videos,
      audios,
      documents,
      total:
        photos +
        videos +
        audios +
        documents,
    };
  }

  /**
   * Delete All Media of Lead
   */
  async deleteLeadMedia(leadId: string) {
    return prisma.leadMedia.deleteMany({
      where: {
        leadId,
      },
    });
  }

  /**
   * Search Media
   */
  async search(leadId: string, keyword: string) {
    return prisma.leadMedia.findMany({
      where: {
        leadId,
        OR: [
          {
            fileName: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            caption: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        uploadedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Media Statistics
   */
  async getStatistics() {
    const [
      total,
      photos,
      videos,
      audios,
      documents,
    ] = await Promise.all([
      prisma.leadMedia.count(),

      prisma.leadMedia.count({
        where: {
          type: "PHOTO",
        },
      }),

      prisma.leadMedia.count({
        where: {
          type: "VIDEO",
        },
      }),

      prisma.leadMedia.count({
        where: {
          type: "AUDIO",
        },
      }),

      prisma.leadMedia.count({
        where: {
          type: "DOCUMENT",
        },
      }),
    ]);

    return {
      total,
      photos,
      videos,
      audios,
      documents,
    };
  }
}