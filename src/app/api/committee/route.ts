import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { CommitteeMemberModel } from "@/models/CommitteeMember";

const defaultCommittee = [
  {
    _id: "com-1",
    name: "Dr. C. Rajesh",
    role: "General Convenor & Principal",
    designation: "Principal, MES Kalladi College",
    institution: "MES Kalladi College Mannarkkad",
    category: "patrons",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    order: 1,
  },
  {
    _id: "com-2",
    name: "Prof. P. K. Mohammed",
    role: "Patron & Chairman",
    designation: "Management Committee Chairman",
    institution: "MES Kalladi College Managing Committee",
    category: "patrons",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    order: 2,
  },
  {
    _id: "com-3",
    name: "Dr. K. S. Sajan",
    role: "Organising Secretary",
    designation: "Associate Professor & IQAC Coordinator",
    institution: "MES Kalladi College Mannarkkad",
    category: "organizing",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    order: 3,
  },
  {
    _id: "com-4",
    name: "Dr. M. S. Deepa",
    role: "Technical Committee Chair",
    designation: "Head, Department of Computer Science",
    institution: "MES Kalladi College Mannarkkad",
    category: "technical",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    order: 4,
  },
  {
    _id: "com-5",
    name: "Dr. Abdul Rasheed",
    role: "Joint Secretary & Public Relations",
    designation: "Assistant Professor, Dept. of Commerce",
    institution: "MES Kalladi College Mannarkkad",
    category: "secretaries",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    order: 5,
  },
];

export async function GET() {
  try {
    await dbConnect();
    const members = await CommitteeMemberModel.find({})
      .sort({ order: 1, name: 1 })
      .lean();

    if (!members || members.length === 0) {
      return NextResponse.json({ success: true, data: defaultCommittee });
    }
    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.warn("GET /api/committee DB fallback triggered:", error);
    return NextResponse.json({ success: true, data: defaultCommittee });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const member = await CommitteeMemberModel.create(body);
    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (error) {
    console.error("POST /api/committee error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create committee member" },
      { status: 500 }
    );
  }
}
