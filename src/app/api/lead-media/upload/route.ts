import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 100 * 1024 * 1024; //100MB

const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

const VIDEO_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/webm",
];

const AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/ogg",
  "audio/mp4",
];

const DOCUMENT_TYPES = [
  "application/pdf",

  "application/msword",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "application/vnd.ms-excel",

  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

function getResourceType(mime: string) {
  if (IMAGE_TYPES.includes(mime)) return "image";

  if (VIDEO_TYPES.includes(mime)) return "video";

  if (AUDIO_TYPES.includes(mime)) return "video";

  return "raw";
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    const leadId = formData.get("leadId") as string;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    if (!leadId) {
      return NextResponse.json(
        {
          success: false,
          message: "leadId is required",
        },
        {
          status: 400,
        }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Maximum upload size is 100MB",
        },
        {
          status: 400,
        }
      );
    }

    const allowed = [
      ...IMAGE_TYPES,
      ...VIDEO_TYPES,
      ...AUDIO_TYPES,
      ...DOCUMENT_TYPES,
    ];

    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unsupported file format",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const resourceType =
      getResourceType(file.type);

    const folder = `crm/leads/${leadId}`;
        const uploadResult = await new Promise<any>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: resourceType,
            use_filename: true,
            unique_filename: true,
            overwrite: false,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(buffer);
      }
    );

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",

      data: {
        url: uploadResult.secure_url,

        publicId: uploadResult.public_id,

        assetId: uploadResult.asset_id,

        resourceType: uploadResult.resource_type,

        format: uploadResult.format,

        bytes: uploadResult.bytes,

        width: uploadResult.width ?? null,

        height: uploadResult.height ?? null,

        duration: uploadResult.duration ?? null,

        originalName: file.name,

        mimeType: file.type,
      },
    });
  } catch (error: any) {
    console.error(
      "CLOUDINARY UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}