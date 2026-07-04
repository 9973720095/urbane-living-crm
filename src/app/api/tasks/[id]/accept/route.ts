import { NextResponse } from "next/server";
import { TaskController } from "@/controllers/task.controller";

const taskController = new TaskController();

export async function PATCH(
  req: Request,
  { params }: any
) {
  try {
    const task =
      await taskController.acceptTask(
        params.id
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
      {
        status: 500,
      }
    );
  }
}