import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt"; // 'import * as' better hai types ke liye

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Safety check for body
    if (!body.email || !body.password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    const { email, password } = body;
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Hash comparison
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    // Success response
    return NextResponse.json({ 
      success: true, 
      user: { email: user.email } 
    });

  } catch (error) {
    console.error("Login Error:", error); // Debugging ke liye zaroori
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}