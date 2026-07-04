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
        {
          status: 500,
        }
      );
    }

    const GID = "521477022";

    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

    console.log("CSV URL =", csvUrl);

const response = await fetch(csvUrl);

console.log("Response Status =", response.status);
console.log("Response OK =", response.ok);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to fetch Google Sheet",
          status: response.status,
        },
        {
          status: 500,
        }
      );
    }

    const csv = await response.text();
    console.log(csv.substring(0, 500));

    console.log("CSV PREVIEW:");
    console.log(csv.substring(0, 500));

    const parsed = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
    });

    const rows = parsed.data as any[];

    console.log("TOTAL ROWS =", rows.length);

    if (rows.length > 0) {
      console.log("FIRST ROW =", rows[0]);
      console.log("HEADERS =", Object.keys(rows[0]));
    }

    let insertedCount = 0;
    let updatedCount = 0;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    for (const row of rows) {
      const phone = row["phone_number"]
        ?.toString()
        .replace(/\D/g, "");

      if (!phone) continue;

      const phoneNumber = `+91${phone.slice(-10)}`;

      const leadData = {
        customer_name: row["full_name"] || "Unknown",

        phone_number: phoneNumber,

        email: row["email"] || null,

        city:
          row[
            "we_exclusively_serve_the_following_cities._please_select_your_city."
          ] || null,

        meta_lead_id: row["id"] || null,

        ad_id: row["ad_id"] || null,

        created_time: row["created_time"]
          ? new Date(row["created_time"])
          : null,

        lead_status: row["lead_status"] || "CREATED",

        location_detail: row["location"] || null,

        timeline: row["schdule"] || null,

        area: row["area"] || null,
      };

      // check existing lead
      const existingLead = await prisma.lead.findFirst({
        where: {
          phone_number: phoneNumber,
        },
      });

      let lead;

      if (existingLead) {
        // update existing lead
        lead = await prisma.lead.update({
          where: {
            id: existingLead.id,
          },
          data: leadData,
        });

        updatedCount++;
      } else {
        // create new lead
        lead = await prisma.lead.create({
          data: leadData,
        });

        insertedCount++;

        try {
          await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: "saban.urbaneliving@gmail.com",
            subject: `🔔 New Lead : ${lead.customer_name}`,
            text: `
Name : ${lead.customer_name}
Phone : ${lead.phone_number}
City : ${lead.city}
Area : ${lead.area}
            `,
          });
        } catch (mailError) {
          console.error("EMAIL ERROR:", mailError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      totalRows: rows.length,
      insertedCount,
      updatedCount,
    });
  } catch (error: any) {
    console.error("SYNC ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message,
        fullError: String(error),
      },
      {
        status: 500,
      }
    );
  }
}