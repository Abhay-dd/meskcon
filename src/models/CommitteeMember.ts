import mongoose, { Schema, Document } from "mongoose";

export interface ICommitteeMember extends Document {
  name: string;
  role: string;
  category:
    | "patron"
    | "chair"
    | "coordinator"
    | "joint_coordinator"
    | "member"
    | "advisory";
  institution?: string;
  image?: { public_id: string; url: string };
  order: number;
  email?: string;
  phone?: string;
}

const CommitteeMemberSchema = new Schema<ICommitteeMember>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        "patron",
        "chair",
        "coordinator",
        "joint_coordinator",
        "member",
        "advisory",
      ],
      required: true,
    },
    institution: { type: String, trim: true },
    image: {
      public_id: { type: String },
      url: { type: String },
    },
    order: { type: Number, default: 0 },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
  },
  { timestamps: true }
);

export const CommitteeMemberModel =
  mongoose.models.CommitteeMember ||
  mongoose.model<ICommitteeMember>(
    "CommitteeMember",
    CommitteeMemberSchema
  );
