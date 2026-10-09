import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { MediaModel } from "@/models/Media";
import { auth } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const media = await MediaModel.findById(id);

    if (!media) {
      return NextResponse.json(
        { success: false, error: "Media not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: media });
  } catch (error) {
    console.error("GET /api/media/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch media item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const media = await MediaModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!media) {
      return NextResponse.json(
        { success: false, error: "Media not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: media });
  } catch (error) {
    console.error("PUT /api/media/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update media item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const media = await MediaModel.findByIdAndDelete(id);

    if (!media) {
      return NextResponse.json(
        { success: false, error: "Media not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Media deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/media/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete media item" },
      { status: 500 }
    );
  }
}
