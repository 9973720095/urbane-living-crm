import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // 1. Unassigned leads fetch karein
    const unassignedLeads = await prisma.lead.findMany({
      where: {
        OR: [
          { assignedToId: null },
        ],
      },
    });

    if (unassignedLeads.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No unassigned leads found.",
        assignedCount: 0,
      });
    }

    // 2. Default Team Members DB mein Sync/Ensure Karein
    const defaultEmployees = [
      { name: "Vibhooti Mishra", email: "vibhooti@urbaneliving.com" },
      { name: "Archit Kumar", email: "archit@urbaneliving.com" },
      { name: "Karun Kumar", email: "karun@urbaneliving.com" },
    ];

    const empMap: Record<string, string> = {};

    for (const emp of defaultEmployees) {
      const dbEmp = await prisma.employee.upsert({
        where: { email: emp.email },
        update: { isActive: true },
        create: {
          name: emp.name,
          email: emp.email,
          password: "DefaultPassword123!", // Schema requirement fix
          isActive: true,
        },
      });
      empMap[emp.name.toLowerCase()] = dbEmp.id;
    }

    let assignedCount = 0;

    // 3. City Wise Assignment Logic
    for (const lead of unassignedLeads) {
      const city = (lead.city || "").trim().toLowerCase();
      let targetName = "Archit Kumar"; // Fallback default

      if (city.includes("noida") || city.includes("gurgaon") || city.includes("gurugram")) {
        targetName = "Vibhooti Mishra";
      } else if (city.includes("ghaziabad")) {
        targetName = "Archit Kumar";
      } else if (city.includes("delhi")) {
        targetName = "Karun Kumar";
      }

      const assignedEmpId = empMap[targetName.toLowerCase()];

      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          assignedToId: assignedEmpId,
        },
      });

      assignedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `${assignedCount} leads successfully assigned to team members!`,
      assignedCount,
    });
  } catch (error: any) {
    console.error("AUTO-ASSIGN ERROR:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Auto-assignment failed" },
      { status: 500 }
    );
  }
}