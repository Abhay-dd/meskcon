import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { SiteSettingsModel } from "@/models/SiteSettings";
import { auth } from "@/lib/auth";

const defaultSettings = {
  heroTitle: "International Conference 2027",
  heroSubtitle:
    "Bridging Knowledge for a Smarter, Sustainable and Inclusive World",
  heroTheme:
    "Bridging Knowledge for a Smarter, Sustainable and Inclusive World",
  conferenceDate: "January 29 - 30, 2027",
  conferenceVenue: "MES Kalladi College, Mannarkkad, Palakkad, Kerala",
  conferenceMode: "Hybrid (Online & In-Person)",
  aboutText:
    "MES Kalladi College Mannarkkad (Autonomous), through IQAC, launched the global MESKCON conference series to promote interdisciplinary dialogue among researchers, academicians, and students.",
  contactEmail: "meskcon@meskc.ac.in",
  contactAddress:
    "Kozhikode - Palakkad Hwy, Kunthipuzha, College PO, Mannarkkad, Kerala 678583",
  registrationLink: "https://www.meskcon.in/register",
  brochureUrl: "",
  countdownDate: "2027-01-29T09:00",
  showCountdown: true,
};

export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSettingsModel.findOne().lean();
    if (!settings) {
      settings = await SiteSettingsModel.create(defaultSettings);
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.warn("GET /api/settings fallback triggered:", error);
    return NextResponse.json({ success: true, data: defaultSettings });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = await SiteSettingsModel.create(body);
    } else {
      settings = await SiteSettingsModel.findByIdAndUpdate(settings._id, body, {
        new: true,
        runValidators: true,
      });
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
