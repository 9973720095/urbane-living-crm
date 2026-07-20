import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * ==========================================
 * GET EMPLOYEE BY ID
 * ==========================================
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: employee,
    });
  } catch (error) {
    console.error("GET EMPLOYEE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch employee.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * ==========================================
 * UPDATE EMPLOYEE
 * ==========================================
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const name = body?.name?.trim();
    const email = body?.email?.trim().toLowerCase();
    const whatsapp = body?.whatsapp?.trim();
    const designation =
      body?.designation?.trim() || null;

    const role =
      body?.role?.trim() || null;

    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (!name || !email || !whatsapp) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, Email and WhatsApp are required.",
        },
        {
          status: 400,
        }
      );
    }

    const emailExists =
      await prisma.employee.findFirst({
        where: {
          email,
          NOT: {
            id,
          },
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

    const phoneExists =
      await prisma.employee.findFirst({
        where: {
          whatsapp,
          NOT: {
            id,
          },
        },
      });

    if (phoneExists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "WhatsApp number already exists.",
        },
        {
          status: 409,
        }
      );
    }

    const updated =
      await prisma.employee.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          whatsapp,
          designation:
            role ??
            designation ??
            null,
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Employee updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("UPDATE EMPLOYEE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update employee.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * ==========================================
 * DELETE EMPLOYEE
 * Soft Delete
 * ==========================================
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const employee =
      await prisma.employee.findUnique({
        where: {
          id,
        },
      });

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.employee.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Employee deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE EMPLOYEE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete employee.",
      },
      {
        status: 500,
      }
    );
  }
}