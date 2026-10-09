import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { ImportantDateModel } from "@/models/ImportantDate";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const date = await ImportantDateModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!date) {
      return NextResponse.json(
        { success: false, error: "Date not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: date });
  } catch (error) {
    console.error("PUT /api/dates/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update date" },
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
    await ImportantDateModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Date deleted" });
  } catch (error) {
    console.error("DELETE /api/dates/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete date" },
      { status: 500 }
    );
  }
}
