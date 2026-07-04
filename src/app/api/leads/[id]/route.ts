import { NextRequest, NextResponse } from "next/server";
import { LeadController } from "@/controllers/lead.controller";
import { LeadStage } from "@prisma/client";

const leadController = new LeadController();

// PATCH: Lead ka stage update karne ke liye (Existing logic)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    console.log("Lead ID for Update:", id);
    console.log("Body:", body);

    const stage = body.stage as LeadStage;

    const updatedLead = await leadController.updateLeadStage(id, stage);

    return NextResponse.json({
      success: true,
      data: updatedLead,
    });
  } catch (error) {
    console.error("PATCH ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Stage update failed" },
      { status: 500 }
    );
  }
}

// POST: Google Sheet se nayi lead create karne ke liye
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Creating new lead from Sheet:", body);

    // Yahan aapke Controller mein createLead function hona chahiye
    const newLead = await leadController.createLead(body);

    return NextResponse.json({
      success: true,
      data: newLead,
    });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Lead creation failed" },
      { status: 500 }
    );
  }
}