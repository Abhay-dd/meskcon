import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { MediaModel } from "@/models/Media";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const mediaType = searchParams.get("mediaType");

    const query: Record<string, unknown> = {};
    if (category && category !== "all") query.category = category;
    if (mediaType && mediaType !== "all") query.mediaType = mediaType;

    const media = await MediaModel.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: media });
  } catch (error) {
    console.error("GET /api/media error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch media items" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const media = await MediaModel.create(body);

    return NextResponse.json({ success: true, data: media }, { status: 201 });
  } catch (error) {
    console.error("POST /api/media error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create media item" },
      { status: 500 }
    );
  }
}
