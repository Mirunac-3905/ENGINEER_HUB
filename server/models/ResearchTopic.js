import mongoose from "mongoose";

const researchTopicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    problemStatement: {
      type: String,
      required: true,
    },
    history: {
      type: String,
    },
    currentSituation: {
      type: String,
    },
    technologies: {
      type: String,
    },
    analysis: {
      type: String,
    },
    keyLearnings: {
      type: String,
    },
    sourceLinks: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Researching', 'Understood', 'Deep Dive Needed', 'Completed'],
      default: 'Researching',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ResearchTopic = mongoose.model('ResearchTopic', researchTopicSchema);

export default ResearchTopic;
