import { NextRequest, NextResponse } from "next/server";
import { EmployeeController } from "@/controllers/employee.controller";

const employeeController = new EmployeeController();

/**
 * ==========================================
 * GET EMPLOYEE BY ID
 * GET /api/employees/:id
 * ==========================================
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const employee =
      await employeeController.getEmployeeById(id);

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee not found",
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
        message: "Failed to fetch employee",
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
 * PUT /api/employees/:id
 * ==========================================
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const employee =
      await employeeController.updateEmployee(
        id,
        body
      );

    return NextResponse.json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    console.error("UPDATE EMPLOYEE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update employee",
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
 * DELETE /api/employees/:id
 * ==========================================
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await employeeController.deleteEmployee(id);

    return NextResponse.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("DELETE EMPLOYEE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete employee",
      },
      {
        status: 500,
      }
    );
  }
}