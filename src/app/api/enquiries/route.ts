import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { EnquiryModel } from "@/models/Enquiry";

export async function GET() {
  try {
    await dbConnect();
    const enquiries = await EnquiryModel.find({})
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    console.error("GET /api/enquiries error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const enquiry = await EnquiryModel.create(body);
    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch (error) {
    console.error("POST /api/enquiries error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
