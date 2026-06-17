import { NextRequest, NextResponse } from "next/server";
import { LeadController } from "@/controllers/lead.controller";
import { LeadStage } from "@prisma/client";

const leadController = new LeadController();

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    console.log("Lead ID:", id);
    console.log("Body:", body);

    const stage = body.stage as LeadStage;

    const updatedLead = await leadController.updateLeadStage(
      id,
      stage
    );

    return NextResponse.json({
      success: true,
      data: updatedLead,
    });
  } catch (error) {
    console.error("PATCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Stage update failed",
      },
      {
        status: 500,
      }
    );
  }
}