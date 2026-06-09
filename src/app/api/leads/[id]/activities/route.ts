import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure this path matches your project structure

export async function GET(
  req: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const activities = await prisma.activity.findMany({
      where: { leadId: params.id },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(activities);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }
}