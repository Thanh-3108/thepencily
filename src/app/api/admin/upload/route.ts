import { NextResponse } from "next/server";
import { verifyAdminAuth, getAdminClient } from "@/lib/server/admin";
import { PlatformError } from "@/lib/platform";

export async function POST(request: Request) {
  try {
    await verifyAdminAuth(request);

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      throw new PlatformError("Vui lòng chọn tệp tin cần tải lên.", 400);
    }

    // Limit to 50MB
    if (file.size > 50 * 1024 * 1024) {
      throw new PlatformError("Kích thước tệp tin không được vượt quá 50MB.", 413);
    }

    const originalName = file.name || "upload.bin";
    const extension = originalName.includes(".") ? originalName.split(".").pop() : "bin";
    const cleanBase = originalName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 50);

    const fileName = `${Date.now()}_${cleanBase}.${extension}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const db = getAdminClient();
    const { data, error } = await db.storage
      .from("pencily-uploads")
      .upload(fileName, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (error) {
      throw new PlatformError(`Lỗi khi lưu trữ tệp vào Supabase: ${error.message}`, 500);
    }

    const { data: urlData } = db.storage.from("pencily-uploads").getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      fileName,
      originalName,
      size: file.size,
      mimeType: file.type,
      publicUrl: urlData.publicUrl,
      path: data.path,
    });
  } catch (error) {
    if (error instanceof PlatformError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Storage upload error:", error);
    return NextResponse.json({ error: "Không thể tải lên tệp tin." }, { status: 500 });
  }
}
