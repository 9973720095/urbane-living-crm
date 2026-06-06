import { NextResponse } from "next/server";
// Pure 5 steps peeche jaana padega controllers tak pahunchne ke liye
import { AuthController } from "../../../../../controllers/authController";

export async function POST(request: Request) {
  try {
    return await AuthController.handleLogin(request);
  } catch (error) {
    console.error("API Auth Route Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}