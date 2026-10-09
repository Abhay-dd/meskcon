import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { CommitteeMemberModel } from "@/models/CommitteeMember";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const member = await CommitteeMemberModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!member) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    console.error("PUT /api/committee/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update member" },
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
    await CommitteeMemberModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Member deleted" });
  } catch (error) {
    console.error("DELETE /api/committee/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete member" },
      { status: 500 }
    );
  }
}
