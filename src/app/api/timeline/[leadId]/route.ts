import { NextRequest, NextResponse } from "next/server";
import { TimelineController } from "@/controllers/timeline.controller";

const timelineController = new TimelineController();

/**
 * GET /api/timeline/:leadId
 */

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;

    if (!leadId) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead ID is required",
        },
        { status: 400 }
      );
    }

    const timeline =
      await timelineController.getLeadTimeline(
        leadId
      );

    return NextResponse.json(
      {
        success: true,
        count: timeline.length,
        data: timeline,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "TIMELINE API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to fetch timeline",
      },
      { status: 500 }
    );
  }
}