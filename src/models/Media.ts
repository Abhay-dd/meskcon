import mongoose, { Schema, Document } from "mongoose";

export interface IMedia extends Document {
  title: string;
  mediaType: "image" | "video";
  url: string;
  public_id: string;
  thumbnailUrl?: string;
  category: string;
  eventYear: string;
  tags?: string[];
}

const MediaSchema = new Schema<IMedia>(
  {
    title: { type: String, required: true, trim: true },
    mediaType: { type: String, enum: ["image", "video"], required: true },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    thumbnailUrl: { type: String },
    category: { type: String, default: "general", trim: true },
    eventYear: { type: String, default: "2027" },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const MediaModel =
  mongoose.models.Media ||
  mongoose.model<IMedia>("Media", MediaSchema);
