import { LeadService } from "@/services/lead.service";
import { LeadStage } from "@prisma/client";

export class LeadController {
  private leadService = new LeadService();

  // =========================
  // READ METHODS
  // =========================

  async getAllLeads() {
    return this.leadService.getAllLeads();
  }

  async getLeadById(id: string) {
    return this.leadService.getLeadById(id);
  }

  async getFilteredLeads(filters: any) {
    return this.leadService.getFilteredLeads(filters);
  }

  // =========================
  // WRITE & UPDATE METHODS
  // =========================

  async createLead(data: any) {
    return await this.leadService.createLead(data);
  }

  async updateLead(id: string, data: any) {
    return await this.leadService.updateLead(id, data);
  }

  async updateLeadStage(id: string, stage: LeadStage) {
    return await this.leadService.updateLeadStage(id, stage);
  }

  // =========================
  // DELETE & ASSIGNMENT METHODS
  // =========================

  async deleteLead(id: string) {
    return await this.leadService.deleteLead(id);
  }

  async assignLead(id: string, employeeId: string) {
    return await this.leadService.assignLead(id, employeeId);
  }
}