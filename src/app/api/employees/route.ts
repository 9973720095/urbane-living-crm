import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        count: employees.length,
        data: employees,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET EMPLOYEES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch employees.",
        data: [],
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = body?.name?.trim();
    const email = body?.email?.trim().toLowerCase();
    const whatsapp = body?.whatsapp?.trim();
    const designation = body?.designation?.trim() || null;
    const role = body?.role?.trim() || null;

    // ===============================
    // Validation
    // ===============================

    if (!name || !email || !whatsapp) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, Email and WhatsApp are required.",
        },
        {
          status: 400,
        }
      );
    }

    // ===============================
    // Duplicate Email
    // ===============================

    const emailExists = await prisma.employee.findFirst({
      where: {
        email,
      },
    });

    if (emailExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists.",
        },
        {
          status: 409,
        }
      );
    }

    // ===============================
    // Duplicate WhatsApp
    // ===============================

    const whatsappExists = await prisma.employee.findFirst({
      where: {
        whatsapp,
      },
    });

    if (whatsappExists) {
      return NextResponse.json(
        {
          success: false,
          message: "WhatsApp number already exists.",
        },
        {
          status: 409,
        }
      );
    }

    // ===============================
    // Create Employee
    // ===============================

    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        whatsapp,
        isActive: true,

        // Current schema support
        designation:
          role ??
          designation ??
          null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Employee created successfully.",
        data: employee,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE EMPLOYEE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create employee.",
      },
      {
        status: 500,
      }
    );
  }
}