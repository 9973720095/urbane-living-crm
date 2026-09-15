import { NextResponse } from "next/server";
import Papa from "papaparse";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;

    if (!SHEET_ID) {
      return NextResponse.json(
        {
          success: false,
          message: "GOOGLE_SHEET_ID missing in .env",
        },
        { status: 500 }
      );
    }

    const GID = "521477022";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

    const response = await fetch(csvUrl, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to fetch Google Sheet",
          status: response.status,
        },
        { status: 500 }
      );
    }

    const csv = await response.text();

    const parsed = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
    });

    const rows = parsed.data as any[];

    if (rows.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No rows to process",
        insertedCount: 0,
        skippedCount: 0,
      });
    }

    let insertedCount = 0;
    let skippedCount = 0;

    // Track phone numbers processed during the current batch run
    const processedPhones = new Set<string>();

    // Transporter for Mail Alerts
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    for (const row of rows) {
      const rawPhone = row["phone_number"] || row["phone"] || row["mobile"];
      if (!rawPhone) continue;

      const cleanDigits = rawPhone.toString().replace(/\D/g, "").slice(-10);
      if (cleanDigits.length < 10) continue; // Skip invalid numbers

      const phoneNumber = `+91${cleanDigits}`;
      const email = row["email"] ? String(row["email"]).trim().toLowerCase() : null;

      // 1. IN-MEMORY SHEET DUP CHECK: Skip if already processed in this batch
      if (processedPhones.has(phoneNumber)) {
        skippedCount++;
        continue;
      }
      processedPhones.add(phoneNumber);

      // 2. DATABASE CHECK: Strict Deduplication Check
      const existingLead = await prisma.lead.findFirst({
        where: { phone_number: phoneNumber },
      });

      if (existingLead) {
        skippedCount++;
        continue;
      }

      // 3. SAFE CREATION IN DATABASE
      try {
        const leadData = {
          customer_name: row["full_name"] || row["name"] || "Unknown",
          phone_number: phoneNumber,
          email: email,
          city:
            row[
              "we_exclusively_serve_the_following_cities._please_select_your_city."
            ] || row["city"] || null,
          meta_lead_id: row["id"] || null,
          ad_id: row["ad_id"] || null,
          created_time: row["created_time"]
            ? new Date(row["created_time"])
            : new Date(),
          lead_status: row["lead_status"] || "CREATED",
          location_detail: row["location"] || null,
          timeline: row["schdule"] || null,
          area: row["area"] || null,
        };

        const newLead = await prisma.lead.create({
          data: leadData,
        });

        insertedCount++;

        // 4. EMAIL ALERT (Only for newly created leads)
        try {
          await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: "saban.urbaneliving@gmail.com",
            subject: `🔔 New Lead Received: ${newLead.customer_name}`,
            text: `
Name  : ${newLead.customer_name}
Phone : ${newLead.phone_number}
Email : ${newLead.email || "N/A"}
City  : ${newLead.city || "N/A"}
Area  : ${newLead.area || "N/A"}
            `,
          });
        } catch (mailError) {
          console.error("EMAIL SENDING FAILED:", mailError);
        }
      } catch (createError) {
        // Safe catch for duplicate constraints or DB errors during insertion
        console.error(`Skipped lead creation for ${phoneNumber}:`, createError);
        skippedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      totalRowsProcessed: rows.length,
      insertedCount,
      skippedCount,
    });
  } catch (error: any) {
    console.error("SYNC ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}