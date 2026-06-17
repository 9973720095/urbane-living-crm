import { LeadRepository } from "@/repositories/lead.repository";
import { LeadStage } from "@prisma/client";

export interface LeadFilters {
  status?: string;
  assignedTo?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export class LeadService {
  private leadRepository = new LeadRepository();

  // =========================
  // EXISTING METHODS (UNCHANGED)
  // =========================

  async getAllLeads() {
    return this.leadRepository.getAll();
  }

  async getLeadById(id: string) {
    return this.leadRepository.getById(id);
  }

  async updateLeadStage(id: string, stage: LeadStage) {
    return this.leadRepository.updateStage(id, stage);
  }

  // =========================
  // 🔥 NEW: FILTERED + PAGINATED LEADS (MAIN CRM POWER)
  // =========================

  async getFilteredLeads(filters: LeadFilters) {
    const {
      status,
      assignedTo,
      search,
      page = 1,
      limit = 10,
      sort = "createdAt_desc",
    } = filters;

    const skip = (page - 1) * limit;

    const where: any = {};

    // STATUS FILTER
    if (status) {
      where.stage = status;
    }

    // ASSIGNED FILTER
    if (assignedTo) {
      where.assignedToId = assignedTo;
    }

    // SEARCH FILTER
    if (search) {
      where.OR = [
        {
          customer_name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          phone_number: {
            contains: search,
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    // SORT LOGIC
    const orderBy =
      sort === "createdAt_asc"
        ? { createdAt: "asc" }
        : sort === "createdAt_desc"
        ? { createdAt: "desc" }
        : { createdAt: "desc" };

    const [data, total] = await Promise.all([
      this.leadRepository.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy,
      }),
      this.leadRepository.count(where),
    ]);

    return {
      data,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    };
  }
}