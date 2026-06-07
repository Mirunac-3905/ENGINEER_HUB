import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: String,

    confidence: {
      type: Number,
      default: 1,
    },

    notes: String,

    interviewQuestions: {
      type: Number,
      default: 0,
    },

    mistakes: {
      type: Number,
      default: 0,
    },

    revisions: {
      type: Number,
      default: 0,
    },

    progress: {
      type: Number,
      default: 0,
    },

    status: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Topic", topicSchema);