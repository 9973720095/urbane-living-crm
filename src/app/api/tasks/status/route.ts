import { NextRequest, NextResponse } from "next/server";
import { TaskController } from "@/controllers/task.controller";

const taskController = new TaskController();

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const { taskId, status } = body;

    const task = await taskController.updateTaskStatus(
      taskId,
      status
    );

    return NextResponse.json({
      success: true,
      data: task,
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