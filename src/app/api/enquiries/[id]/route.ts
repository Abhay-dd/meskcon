import { NextResponse } from "next/server";
import { EnquiryModel } from "@/models/Enquiry";
import dbConnect from "@/lib/mongodb";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const enquiry = await EnquiryModel.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    if (!enquiry) {
      return NextResponse.json(
        { success: false, error: "Enquiry not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: enquiry });
  } catch (error) {
    console.error("PATCH /api/enquiries/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update enquiry" },
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
    await EnquiryModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Enquiry deleted" });
  } catch (error) {
    console.error("DELETE /api/enquiries/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
