import mongoose from "mongoose";

const skillsIdentified = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
});

const skillSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skills:[skillsIdentified],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Skill =
  mongoose.models.Skill || mongoose.model("Skill", skillSchema);
