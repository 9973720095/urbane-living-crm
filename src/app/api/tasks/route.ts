import { NextRequest, NextResponse } from "next/server";
import { TaskController } from "@/controllers/task.controller";

const taskController = new TaskController();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const task = await taskController.createTask(body);

    return NextResponse.json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Task creation failed",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const employeeId =
      req.nextUrl.searchParams.get("employeeId");

    if (!employeeId) {
      return NextResponse.json(
        {
          success: false,
          message: "employeeId required",
        },
        { status: 400 }
      );
    }

    const tasks =
      await taskController.getEmployeeTasks(employeeId);

    return NextResponse.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}