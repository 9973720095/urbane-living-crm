import { NextRequest, NextResponse } from "next/server";
import { TaskController } from "@/controllers/task.controller";

const taskController = new TaskController();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const task = await taskController.getTaskById(id);

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