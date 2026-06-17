import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { assignedTo } = await req.json();
  await prisma.lead.update({ where: { id: params.id }, data: { assignedTo, status: "Assigned" } });
  return NextResponse.json({ ok: true });
}