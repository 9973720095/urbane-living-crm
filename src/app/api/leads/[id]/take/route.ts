import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { employeeEmail } = await request.json();

    const employee = await prisma.employee.findFirst({ where: { email: employeeEmail } });
    if (!employee) return NextResponse.json({ error: "Employee not found" }, { status: 404 });

    const lead = await prisma.lead.update({
      where: { id },
      data: { assignedToId: employee.id },
      include: { assignedTo: true },
    });

    // --- EMAIL ---
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // <-- App Password dalna padega
      },
    });

    await transporter.sendMail({
      from: `"Urbane CRM" <${process.env.GMAIL_USER}>`,
      to: employee.email,
      subject: `New Lead: ${lead.customer_name} - ${lead.phone_number}`,
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2 style="color:#4f46e5">Lead Assigned!</h2>
          <p>Hi ${employee.name},</p>
          <p><b>${lead.customer_name}</b> aapko assign hua hai.</p>
          <p>📞 ${lead.phone_number}<br>📍 ${lead.city || 'N/A'}<br>🏷️ ${lead.stage}</p>
          <a href="http://localhost:3000" style="background:#4f46e5;color:white;padding:10px 20px;text-decoration:none;border-radius:8px">Open CRM</a>
        </div>
      `,
    }).catch(e => console.log("Mail error:", e.message));

    return NextResponse.json(lead);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
