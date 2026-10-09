import { NextResponse } from "next/server";
import { generateSignature } from "@/lib/cloudinary";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder") || "meskcon";
    const signatureData = await generateSignature(folder);
    return NextResponse.json({ success: true, ...signatureData });
  } catch (error) {
    console.error("GET /api/cloudinary/signature error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}
