import { SheetRepository } from "../../../repositories/sheetRepository";

export class LeadService {
  static async syncLeads(spreadsheetId: string) {
    const rows = await SheetRepository.getLeadsFromSheet(spreadsheetId);
    // Yahan loop chala kar database mein save karo (Prisma)
    return rows.map(row => row.toObject()); 
  }
}