import { NextResponse } from "next/server";
import { LeadController } from "@/controllers/lead.controller";

const leadController = new LeadController();

export async function GET() {
  try {
    const leads = await leadController.getAllLeads();

    return NextResponse.json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.error("GET LEADS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Failed to fetch leads",
      },
      {
        status: 500,
      }
    );
  }
}