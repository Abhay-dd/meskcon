import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { SpeakerModel } from "@/models/Speaker";

const defaultSpeakers = [
  {
    _id: "spk-1",
    name: "Dr. Elena Rostova",
    designation: "Professor of Computational Intelligence",
    institution: "ETH Zurich, Switzerland",
    bio: "Pioneering researcher in sustainable machine learning paradigms, low-power edge compute, and neural optimization for eco-responsible architectures.",
    topic: "Sustainable AI & Green Computing Frontiers",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    category: "keynote",
    isKeynote: true,
    order: 1,
  },
  {
    _id: "spk-2",
    name: "Prof. Kenneth Sterling",
    designation: "Chair of Development Studies",
    institution: "University of Oxford, UK",
    bio: "Leading development economist advising international organizations on circular supply networks and post-crisis macroeconomic stabilization.",
    topic: "Global Economic Resilience in Developing Nations",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    category: "keynote",
    isKeynote: true,
    order: 2,
  },
  {
    _id: "spk-3",
    name: "Dr. Rajeshwar Sharma",
    designation: "Director of Clean Energy Initiatives",
    institution: "IIT Bombay, India",
    bio: "Distinguished material scientist with over 150 patents in biodegradable polymer composites and solar photovoltaic integration.",
    topic: "Circular Economy & Renewable Materials",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    category: "keynote",
    isKeynote: true,
    order: 3,
  },
  {
    _id: "spk-4",
    name: "Dr. Amina Al-Mansoor",
    designation: "Head of Environmental Informatics",
    institution: "National University of Singapore",
    bio: "Global authority on geospatial data fusion, tropical climate adaptation modeling, and oceanic biodiversity metrics.",
    topic: "Geospatial Intelligence for Climate Action",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    category: "invited",
    isKeynote: false,
    order: 4,
  },
];

export async function GET() {
  try {
    await dbConnect();
    const speakers = await SpeakerModel.find({})
      .sort({ isKeynote: -1, speakerType: 1, order: 1, name: 1 })
      .lean();

    if (!speakers || speakers.length === 0) {
      return NextResponse.json({ success: true, data: defaultSpeakers });
    }
    return NextResponse.json({ success: true, data: speakers });
  } catch (error) {
    console.warn("GET /api/speakers DB fallback triggered:", error);
    return NextResponse.json({ success: true, data: defaultSpeakers });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const speaker = await SpeakerModel.create(body);
    return NextResponse.json({ success: true, data: speaker }, { status: 201 });
  } catch (error) {
    console.error("POST /api/speakers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create speaker" },
      { status: 500 }
    );
  }
}
