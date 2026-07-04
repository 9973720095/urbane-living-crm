import { LeadService } from "@/services/lead.service";
import { LeadStage } from "@prisma/client";

export class LeadController {
  private leadService = new LeadService();

  // =========================
  // EXISTING METHODS
  // =========================

  async getAllLeads() {
    return this.leadService.getAllLeads();
  }

  async getLeadById(id: string) {
    return this.leadService.getLeadById(id);
  }

  async updateLeadStage(id: string, stage: LeadStage) {
    return this.leadService.updateLeadStage(id, stage);
  }

  // =========================
  // NEW: CREATE LEAD METHOD
  // =========================

  async createLead(data: any) {
    return await this.leadService.createLead(data);
  }

  // =========================
  // EXISTING: FILTERED LEADS
  // =========================

  async getFilteredLeads(filters: any) {
    return this.leadService.getFilteredLeads(filters);
  }
}