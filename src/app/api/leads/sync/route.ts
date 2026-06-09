import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Papa from "papaparse";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function GET() {
  const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
  const GID = "521477022";
  const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

  const res = await fetch(csvUrl, { cache: 'no-store' });
  const csv = await res.text();
  const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true });
  const rows = data as any[];

  let newCount = 0;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
  });

  for (const row of rows) {
    const phone = row['phone_number']?.toString().replace(/\D/g, '');
    if (!phone) continue;

    const leadData = {
      customer_name: row['full_name'] || 'Unknown',
      phone_number: `+91${phone.slice(-10)}`,
      email: row['email'] || null,
      city: row['we_exclusively_s_full_name'] || null,
      meta_lead_id: row['id'] || null,
      ad_id: row['ad_id'] || null,
      created_time: row['created_time']? new Date(row['created_time']) : null,
      lead_status: row['lead_status'] || 'CREATED',
      location_detail: row['location'] || null,
      timeline: row['timeline'] || null,
      area: row['area'] || null,
    };

    const exists = await prisma.lead.findUnique({ where: { phone_number: leadData.phone_number } });

    if (!exists) {
      const newLead = await prisma.lead.create({ data: leadData });
      newCount++;

      // NOTIFICATION - sirf saban.urbaneliving@gmail.com ko
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: 'saban.urbaneliving@gmail.com',
        subject: `🔔 New Ceiling Lead: ${newLead.customer_name}`,
        text: `Name: ${newLead.customer_name}\nPhone: ${newLead.phone_number}\nCity: ${newLead.city}\nArea: ${newLead.area}`
      });
    }
  }

  return NextResponse.json({ total: rows.length, new: newCount });
}