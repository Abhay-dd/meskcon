import mongoose, { Schema, Document } from "mongoose";

export interface IImportantDate extends Document {
  title: string;
  date: Date;
  description?: string;
  status: "active" | "upcoming" | "closed";
  order: number;
  icon?: string;
}

const ImportantDateSchema = new Schema<IImportantDate>(
  {
    title: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ["active", "upcoming", "closed"],
      default: "upcoming",
    },
    order: { type: Number, default: 0 },
    icon: { type: String, default: "Calendar" },
  },
  { timestamps: true }
);

export const ImportantDateModel =
  mongoose.models.ImportantDate ||
  mongoose.model<IImportantDate>("ImportantDate", ImportantDateSchema);
