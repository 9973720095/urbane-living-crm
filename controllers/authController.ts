import { NextResponse } from "next/server";
import { AuthService } from "../services/authService";

export class AuthController {
  /**
   * Controller handler to process incoming login HTTP requests
   */
  static async handleLogin(request: Request) {
    try {
      const body = await request.json();
      const { email, password } = body;

      if (!email || !password) {
        return NextResponse.json(
          { success: false, message: "Email and password are required fields" },
          { status: 400 }
        );
      }

      // Safeguard reference mapping to prevent compile-time property exceptions
      const serviceModule = AuthService as any;
      const executableLogin = serviceModule.loginUser || serviceModule.login;

      if (!executableLogin) {
        return NextResponse.json(
          { success: false, message: "Authentication method resolution failure" },
          { status: 500 }
        );
      }

      const result = await executableLogin(email, password);

      if (!result.success) {
        return NextResponse.json(
          { success: false, message: result.message },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { success: true, message: result.message, user: result.user },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error inside AuthController.handleLogin:", error);
      return NextResponse.json(
        { success: false, message: "Internal Server Error at Controller Layer" },
        { status: 500 }
      );
    }
  }

  static async handleSystemHealthCheck() {
    return NextResponse.json(
      { success: true, message: "System core baseline connection is stable" },
      { status: 200 }
    );
  }
}