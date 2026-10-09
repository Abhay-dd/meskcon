import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { ImportantDateModel } from "@/models/ImportantDate";

const defaultDates = [
  {
    _id: "dt-1",
    title: "Call for Papers & Abstract Submission Opens",
    date: new Date("2026-11-15T00:00:00.000Z"),
    deadline: "11:59 PM IST",
    status: "active",
    description:
      "Online portal opens for 500-word structured abstracts across all tracks.",
    order: 1,
    isActive: true,
  },
  {
    _id: "dt-2",
    title: "Full Manuscript Submission Deadline",
    date: new Date("2026-12-20T00:00:00.000Z"),
    deadline: "11:59 PM IST",
    status: "upcoming",
    description:
      "Strict deadline for complete research papers adhering to conference format.",
    order: 2,
    isActive: true,
  },
  {
    _id: "dt-3",
    title: "Peer Review Notification of Acceptance",
    date: new Date("2027-01-10T00:00:00.000Z"),
    deadline: "05:00 PM IST",
    status: "upcoming",
    description:
      "Authors notified of acceptance and camera-ready revision guidelines.",
    order: 3,
    isActive: true,
  },
  {
    _id: "dt-4",
    title: "Early Bird Delegate Registration Closes",
    date: new Date("2027-01-20T00:00:00.000Z"),
    deadline: "11:59 PM IST",
    status: "upcoming",
    description:
      "Final day for discounted author and student registration packages.",
    order: 4,
    isActive: true,
  },
  {
    _id: "dt-5",
    title: "MESKCON 2027 Conference Inauguration",
    date: new Date("2027-01-29T09:00:00.000Z"),
    deadline: "09:00 AM IST",
    status: "upcoming",
    description:
      "Grand opening ceremony and keynote address at MES Kalladi College.",
    order: 5,
    isActive: true,
  },
];

export async function GET() {
  try {
    await dbConnect();
    const dates = await ImportantDateModel.find({ isActive: true })
      .sort({ order: 1, date: 1 })
      .lean();

    if (!dates || dates.length === 0) {
      return NextResponse.json({ success: true, data: defaultDates });
    }
    return NextResponse.json({ success: true, data: dates });
  } catch (error) {
    console.warn("GET /api/dates DB fallback triggered:", error);
    return NextResponse.json({ success: true, data: defaultDates });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const date = await ImportantDateModel.create(body);
    return NextResponse.json({ success: true, data: date }, { status: 201 });
  } catch (error) {
    console.error("POST /api/dates error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create date" },
      { status: 500 }
    );
  }
}
