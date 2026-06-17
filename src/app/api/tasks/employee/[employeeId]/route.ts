import { NextRequest, NextResponse } from "next/server";
import { TaskController } from "@/controllers/task.controller";

const taskController = new TaskController();

export async function POST(req: NextRequest, { params }: { params: { employeeId: string } }) {
  try {
    const body = await req.json();

    if (
      !body.title ||
      !body.type ||
      !body.leadId ||
      !body.employeeId ||
      !body.scheduledAt
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const task = await taskController.createTask(body);

    return NextResponse.json(
      {
        success: true,
        message: "Task created successfully",
        data: task,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("TASK_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Task creation failed",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest, { params }: { params: { employeeId: string } }) {
  try {
    const employeeId = params.employeeId;

    // Pagination
    const page = Number(
      req.nextUrl.searchParams.get("page") || 1
    );

    const limit = Number(
      req.nextUrl.searchParams.get("limit") || 20
    );

    // Employee Tasks
    if (employeeId) {
      const tasks =
        await taskController.getEmployeeTasks(employeeId);

      return NextResponse.json({
        success: true,
        count: tasks.length,
        page,
        limit,
        data: tasks,
      });
    }

    // Default → Today Tasks
    const tasks = await taskController.getTodayTasks();

    return NextResponse.json({
      success: true,
      count: tasks.length,
      page,
      limit,
      data: tasks,
    });
  } catch (error) {
    console.error("TASK_FETCH_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch tasks",
      },
      {
        status: 500,
      }
    );
  }
}
