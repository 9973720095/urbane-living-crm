import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { assignedTo } = await req.json();
  await prisma.lead.update({ where: { id: params.id }, data: { assignedTo, status: "Assigned" } });
  return NextResponse.json({ ok: true });
}