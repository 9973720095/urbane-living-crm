import { NextResponse } from "next/server";
import { TaskController } from "@/controllers/task.controller";

const taskController = new TaskController();

export async function GET() {
  try {
    const tasks = await taskController.getPendingTasks();

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