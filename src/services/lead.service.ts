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
  // READ METHODS
  // =========================

  async getAllLeads() {
    return this.leadRepository.getAll();
  }

  async getLeadById(id: string) {
    if (!id) throw new Error("Lead ID is required");
    return this.leadRepository.getById(id);
  }

  // =========================
  // WRITE & UPDATE METHODS
  // =========================

  async createLead(data: any) {
    if (!data.customer_name || !data.phone_number) {
      throw new Error("Customer name and phone number are required");
    }

    // Phone number clean-up (+91 formatting)
    const rawDigits = String(data.phone_number).replace(/[^0-9]/g, "");
    const core10 = rawDigits.slice(-10);
    const formattedPhone = core10.length === 10 ? `+91${core10}` : data.phone_number;

    return await this.leadRepository.create({
      ...data,
      phone_number: formattedPhone,
    });
  }

  async updateLead(id: string, data: any) {
    if (!id) throw new Error("Lead ID is required for update");

    const updatePayload: any = { ...data };

    // Format stage if passed as string
    if (data.stage || data.lead_status) {
      const rawStage = data.stage || data.lead_status;
      const formattedStage = rawStage.toUpperCase().replace(/\s+/g, "_");
      
      if (Object.values(LeadStage).includes(formattedStage as LeadStage)) {
        updatePayload.stage = formattedStage as LeadStage;
        updatePayload.lead_status = formattedStage;
      }
    }

    // Convert date string to ISO Date object if passed
    if (data.nextFollowUp) {
      updatePayload.nextFollowUp = new Date(data.nextFollowUp);
    }

    return await this.leadRepository.update(id, updatePayload);
  }

  async updateLeadStage(id: string, stage: LeadStage) {
    if (!id) throw new Error("Lead ID is required");
    return this.leadRepository.updateStage(id, stage);
  }

  // =========================
  // DELETE & ASSIGNMENT METHODS
  // =========================

  async deleteLead(id: string) {
    if (!id) throw new Error("Lead ID is required for deletion");
    return await this.leadRepository.delete(id);
  }

  async assignLead(id: string, employeeId: string) {
    if (!id || !employeeId) {
      throw new Error("Both Lead ID and Employee ID are required for assignment");
    }
    return await this.leadRepository.update(id, { assignedToId: employeeId });
  }

  // =========================
  // FILTERED + PAGINATED LEADS
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

    if (status) {
      where.stage = status;
    }

    if (assignedTo) {
      where.assignedToId = assignedTo;
    }

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