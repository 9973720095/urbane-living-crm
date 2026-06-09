import { applyLeadFilters } from "@/lib/filters/lead.filters";
import { prisma } from "@/lib/prisma";

export class LeadController {
  static async getLeads(filters: any) {
    const where = applyLeadFilters(filters);
    return await prisma.lead.findMany({ 
        where,
        orderBy: { createdAt: 'desc' } // Latest leads pehle dikhengi
    });
  }
  // ... existing update methods
}