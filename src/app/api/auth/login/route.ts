import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password required" }, { status: 400 });
    }

    const employee = await prisma.employee.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!employee) {
      return NextResponse.json({ success: false, message: "Employee not found" }, { status: 404 });
    }

    if (!employee.isActive) {
      return NextResponse.json({ success: false, message: "Account deactivated" }, { status: 403 });
    }

    // hash + plain dono support
    let isValid = false;
    if (employee.password.startsWith("$2")) {
      isValid = await bcrypt.compare(password, employee.password);
    } else {
      isValid = employee.password === password;
    }

    if (!isValid) {
      return NextResponse.json({ success: false, message: "Invalid Password" }, { status: 401 });
    }

    // lastLogin update - non-blocking, deadlock se login fail nahi hoga
    prisma.employee.update({
      where: { id: employee.id },
      data: { lastLogin: new Date() },
    }).catch((e) => {
      console.warn("lastLogin update skipped:", e.message);
    });

    return NextResponse.json({
      success: true,
      employee: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        department: employee.department,
      },
    });
  } catch (error: any) {
    console.error("LOGIN 500:", error);
    return NextResponse.json({ success: false, message: error.message || "Server error" }, { status: 500 });
  }
}