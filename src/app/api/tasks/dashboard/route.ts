import { NextResponse } from "next/server";
import { TaskController } from "@/controllers/task.controller";

const taskController = new TaskController();

export async function GET() {
  try {
    const data = await taskController.getDashboardStats();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard stats",
      },
      { status: 500 }
    );
  }
}