import mongoose, { Schema, Document } from "mongoose";

export interface ISpeaker extends Document {
  name: string;
  role: string;
  organization: string;
  country: string;
  countryCode?: string;
  topic?: string;
  bio?: string;
  image?: { public_id: string; url: string };
  order: number;
  isKeynote: boolean;
  speakerType: "international" | "national";
}

const SpeakerSchema = new Schema<ISpeaker>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    country: { type: String, required: true, default: "India" },
    countryCode: { type: String, default: "IN" },
    topic: { type: String, trim: true },
    bio: { type: String, trim: true },
    image: {
      public_id: { type: String },
      url: { type: String },
    },
    order: { type: Number, default: 0 },
    isKeynote: { type: Boolean, default: false },
    speakerType: {
      type: String,
      enum: ["international", "national"],
      default: "national",
    },
  },
  { timestamps: true }
);

export const SpeakerModel =
  mongoose.models.Speaker ||
  mongoose.model<ISpeaker>("Speaker", SpeakerSchema);
