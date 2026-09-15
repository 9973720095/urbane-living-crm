import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const phoneNumber = formData.get("phoneNumber") as string;
    const employeeId = formData.get("employeeId") as string;
    const direction = (formData.get("direction") as any) || "OUTGOING";
    const duration = parseInt((formData.get("duration") as string) || "0", 10);
    const audioFile = formData.get("audio") as File | null;

    if (!phoneNumber) {
      return NextResponse.json({ error: "phoneNumber is required" }, { status: 400 });
    }

    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "").slice(-10);

    // 1. Find Matching Lead
    const lead = await prisma.lead.findFirst({
      where: { phone_number: { contains: cleanPhone } },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found for this phone number" }, { status: 444 });
    }

    let uploadedAudioUrl = null;

    // 2. Upload Audio File if exists
    if (audioFile && audioFile.size > 0) {
      const arrayBuffer = await audioFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "video", // Required for Audio in Cloudinary
            folder: "crm_call_recordings",
            format: "mp3",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      uploadedAudioUrl = uploadResult.secure_url;
    }

    // 3. Save into CallRecording table
    const record = await prisma.callRecording.create({
      data: {
        leadId: lead.id,
        employeeId: employeeId || null,
        phoneNumber: `+91${cleanPhone}`,
        direction,
        duration,
        recordingUrl: uploadedAudioUrl,
      },
    });

    return NextResponse.json({ success: true, record }, { status: 201 });
  } catch (error: any) {
    console.error("Call Sync API Error:", error);
    return NextResponse.json({ error: "Server Error", details: error.message }, { status: 500 });
  }
}