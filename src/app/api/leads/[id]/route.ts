import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LeadStage } from "@prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    console.log("--> Updating Lead ID:", id);
    console.log("--> Payload Received:", body);

    // Existing Lead check for Activity logs
    const existingLead = await prisma.lead.findUnique({
      where: { id },
      select: { stage: true, remarks: true },
    });

    if (!existingLead) {
      return NextResponse.json(
        { success: false, message: "Lead not found" },
        { status: 444 }
      );
    }

    const {
      stage,
      lead_status,
      scope,
      bhk,
      bhkType,
      budget,
      estimatedBudget,
      notes,
      remarks,
      nextFollowUp,
      next_follow_up,
      performedBy,
    } = body;

    // Direct resolution
    const rawStage = stage || lead_status;
    const bhkVal = bhkType || scope || bhk;
    const budgetVal = estimatedBudget || budget;
    const notesVal = remarks !== undefined ? remarks : notes;
    const dateInput = nextFollowUp !== undefined ? nextFollowUp : next_follow_up;

    // Safely cast Enum for 'stage'
    let enumStage: LeadStage | undefined = undefined;
    if (rawStage) {
      const formatted = rawStage.toUpperCase().replace(/\s+/g, "_");
      if (Object.values(LeadStage).includes(formatted as LeadStage)) {
        enumStage = formatted as LeadStage;
      }
    }

    const dataToUpdate: any = {};

    if (enumStage) {
      dataToUpdate.stage = enumStage;
      dataToUpdate.lead_status = enumStage; // Keep lead_status in sync
    }
    if (bhkVal) dataToUpdate.bhkType = bhkVal;
    if (budgetVal) dataToUpdate.estimatedBudget = budgetVal;
    if (notesVal !== undefined) dataToUpdate.remarks = notesVal;
    if (dateInput !== undefined) {
      dataToUpdate.nextFollowUp = dateInput ? new Date(dateInput) : null;
    }

    // Update Lead & create Activity log atomically using transaction
    const [updatedLead] = await prisma.$transaction([
      prisma.lead.update({
        where: { id },
        data: dataToUpdate,
      }),
      ...(enumStage && enumStage !== existingLead.stage
        ? [
            prisma.activity.create({
              data: {
                leadId: id,
                type: "STAGE_CHANGE",
                oldStatus: existingLead.stage,
                newStatus: enumStage,
                note: notesVal || "Lead stage updated via drawer",
                performedBy: performedBy || "System User",
              },
            }),
          ]
        : []),
    ]);

    return NextResponse.json({
      success: true,
      data: updatedLead,
    });
  } catch (error: any) {
    console.error("PATCH SERVER ERROR:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Lead update failed" },
      { status: 500 }
    );
  }
}