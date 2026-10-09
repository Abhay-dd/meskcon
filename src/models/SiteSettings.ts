import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSettings extends Document {
  heroTitle: string;
  heroSubtitle: string;
  heroTheme: string;
  conferenceDate: string;
  conferenceVenue: string;
  conferenceMode: string;
  aboutText: string;
  contactEmail: string;
  contactAddress: string;
  registrationLink: string;
  brochureUrl?: string;
  countdownDate: string;
  showCountdown: boolean;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    heroTitle: {
      type: String,
      default: "International Conference 2027",
    },
    heroSubtitle: {
      type: String,
      default:
        "Bridging Knowledge for a Smarter, Sustainable and Inclusive World",
    },
    heroTheme: {
      type: String,
      default:
        "Bridging Knowledge for a Smarter, Sustainable and Inclusive World",
    },
    conferenceDate: { type: String, default: "January 29 - 30, 2027" },
    conferenceVenue: {
      type: String,
      default: "MES Kalladi College, Mannarkkad, Palakkad, Kerala",
    },
    conferenceMode: { type: String, default: "Hybrid (Online & In-Person)" },
    aboutText: {
      type: String,
      default:
        "MES Kalladi College Mannarkkad (Autonomous), through IQAC, launched the global MESKCON conference series to promote interdisciplinary dialogue among researchers, academicians, and students.",
    },
    contactEmail: {
      type: String,
      default: "meskcon@meskc.ac.in",
    },
    contactAddress: {
      type: String,
      default:
        "Kozhikode - Palakkad Hwy, Kunthipuzha, College PO, Mannarkkad, Kerala 678583",
    },
    registrationLink: {
      type: String,
      default: "https://www.meskcon.in/register",
    },
    brochureUrl: { type: String, default: "" },
    countdownDate: {
      type: String,
      default: "2027-01-29T09:00",
    },
    showCountdown: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const SiteSettingsModel =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
