import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// CORS Headers Configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Preflight Requests Options Handler
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        assignedTo: true,
        callRecordings: {
          include: {
            employee: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: leads,
      },
      { headers: corsHeaders }
    );
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
        headers: corsHeaders,
      }
    );
  }
}