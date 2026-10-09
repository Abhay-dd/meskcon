import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { SpeakerModel } from "@/models/Speaker";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const speaker = await SpeakerModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!speaker) {
      return NextResponse.json(
        { success: false, error: "Speaker not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: speaker });
  } catch (error) {
    console.error("PUT /api/speakers/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update speaker" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const speaker = await SpeakerModel.findByIdAndDelete(id);
    if (!speaker) {
      return NextResponse.json(
        { success: false, error: "Speaker not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Speaker deleted" });
  } catch (error) {
    console.error("DELETE /api/speakers/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete speaker" },
      { status: 500 }
    );
  }
}
