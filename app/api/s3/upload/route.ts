import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { S3 } from "@/lib/S3-client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { fileUploadSchema } from "./schema";

export async function POST(req: Request) {
  await requireAdmin();

  try {
    const body = await req.json();
    const validation = fileUploadSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { fileName, contentType, size } = validation.data;

    const uniqueFileName = `${uuidv4()}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: uniqueFileName,
      ContentType: contentType,
      ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360,
    });
    const response = {
      presignedUrl,
      key: uniqueFileName,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to Generate Presigned URL" },
      { status: 500 }
    );
  }
}
