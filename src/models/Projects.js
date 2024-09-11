import mongoose from "mongoose";

const TechnologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  confidence: { type: Number, required: true },
});

const ChallengeSchema = new mongoose.Schema({
  description: { type: String, required: true },
  confidence: { type: Number, required: true },
});

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  confidence: { type: Number, required: true },
});

const FeatureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  confidence: { type: Number, required: true },
});

const OutcomeSchema = new mongoose.Schema({
  description: { type: String, required: true },
  confidence: { type: Number, required: true },
});

const LearningSchema = new mongoose.Schema({
  description: { type: String, required: true },
  confidence: { type: Number, required: true },
});

const Projects = new mongoose.Schema({
  projectType: { type: String, required: true },
  projectPurpose: { type: String, required: true },
  technology: [TechnologySchema],
  keyChallenges: [ChallengeSchema],
  skillsIdentified: [SkillSchema],
  featuresImplemented: [FeatureSchema],
  outcomes: [OutcomeSchema],
  learnings: [LearningSchema],
  startDate: { type: Date, required: true, default: Date.now },
  endDate: { type: Date, required: true, default: Date.now },
}, { _id: true });

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: [Projects],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
