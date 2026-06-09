import { NextResponse } from "next/server";
import { LeadController } from "@/controllers/lead.controller";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Extract filters from URL
  const filters = {
    status: searchParams.get("status"),
    employeeId: searchParams.get("employeeId"),
    search: searchParams.get("search"),
  };

  // Controller call karo
  const leads = await LeadController.getLeads(filters);
  return NextResponse.json(leads);
}