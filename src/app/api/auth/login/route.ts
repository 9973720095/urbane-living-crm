import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. User find karein
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 2. Direct password compare (NO BCRYPT)
    if (password !== user.password) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    // 3. Success
    return NextResponse.json({ success: true, user: { email: user.email } });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}