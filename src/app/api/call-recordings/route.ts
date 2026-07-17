import { NextRequest, NextResponse } from "next/server";

interface CallRecordingResponse {
  id: string;
  leadId: string;
  phoneNumber: string;
  employeeName: string | null;
  direction: "INCOMING" | "OUTGOING";
  duration: number;
  recordingUrl: string;
  createdAt: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const leadId = searchParams.get("leadId");

    if (!leadId) {
      return NextResponse.json(
        {
          success: false,
          message: "leadId is required",
          data: [],
        },
        {
          status: 400,
        }
      );
    }

    /**
     * ==========================================================
     * TODO
     * Replace this with Prisma Repository once
     * CallRecording model is created.
     * ==========================================================
     */

    const recordings: CallRecordingResponse[] = [];

    return NextResponse.json(
      {
        success: true,
        message: recordings.length
          ? "Call recordings fetched successfully."
          : "No call recordings found.",
        total: recordings.length,
        data: recordings,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("CALL RECORDINGS API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch call recordings.",
        data: [],
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * POST
 * (Future Upload API)
 */
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: "Upload API not implemented yet.",
    },
    {
      status: 501,
    }
  );
}

/**
 * DELETE
 * (Future Delete API)
 */
export async function DELETE() {
  return NextResponse.json(
    {
      success: false,
      message: "Delete API not implemented yet.",
    },
    {
      status: 501,
    }
  );
}