import { NextRequest, NextResponse } from "next/server";
import { TaskController } from "@/controllers/task.controller";

const taskController = new TaskController();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const employeeId = searchParams.get("employeeId");

    if (!employeeId) {
      return NextResponse.json(
        {
          success: false,
          message: "employeeId is required",
        },
        { status: 400 }
      );
    }

    const tasks = await taskController.getTodayTasks(employeeId);

    return NextResponse.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error("Today Tasks Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch today's tasks",
      },
      { status: 500 }
    );
  }
}