import { NextRequest, NextResponse } from "next/server";
import { LeadMediaController } from "@/controllers/leadMedia.controller";

const leadMediaController = new LeadMediaController();

/**
 * ======================================
 * GET
 * Get Lead Media
 * ======================================
 *
 * /api/lead-media?leadId=xxxx
 *
 */

export async function GET(req: NextRequest) {
  try {
    const leadId =
      req.nextUrl.searchParams.get("leadId");

    if (!leadId) {
      return NextResponse.json(
        {
          success: false,
          message: "leadId is required",
        },
        {
          status: 400,
        }
      );
    }

    const media =
      await leadMediaController.getLeadMedia(
        leadId
      );

    return NextResponse.json({
      success: true,
      count: media.length,
      data: media,
    });
  } catch (error) {
    console.error(
      "GET LEAD MEDIA ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch lead media",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * ======================================
 * POST
 * Upload Media
 * ======================================
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const media =
      await leadMediaController.uploadMedia(
        body
      );

    return NextResponse.json(
      {
        success: true,
        message:
          "Media uploaded successfully",
        data: media,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(
      "UPLOAD MEDIA ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * ======================================
 * PATCH
 * Update Media
 * ======================================
 *
 * Body:
 * {
 *   id,
 *   caption,
 *   fileName
 * }
 *
 */

export async function PATCH(
  req: NextRequest
) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Media id is required",
        },
        {
          status: 400,
        }
      );
    }

    const media =
      await leadMediaController.updateMedia(
        body.id,
        {
          caption: body.caption,
          fileName: body.fileName,
        }
      );

    return NextResponse.json({
      success: true,
      message:
        "Media updated successfully",
      data: media,
    });
  } catch (error: any) {
    console.error(
      "UPDATE MEDIA ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * ======================================
 * DELETE
 * Delete Media
 * ======================================
 *
 * Body:
 * {
 *    id
 * }
 *
 */

export async function DELETE(
  req: NextRequest
) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Media id is required",
        },
        {
          status: 400,
        }
      );
    }

    await leadMediaController.deleteMedia(
      body.id
    );

    return NextResponse.json({
      success: true,
      message:
        "Media deleted successfully",
    });
  } catch (error: any) {
    console.error(
      "DELETE MEDIA ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}