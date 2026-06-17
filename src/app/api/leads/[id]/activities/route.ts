import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const activities = await prisma.activity.findMany({
      where: {
        leadId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    console.error("Fetch Activities Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch activities",
      },
      {
        status: 500,
      }
    );
  }
}