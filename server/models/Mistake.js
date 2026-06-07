import mongoose from "mongoose";

const mistakeSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: String,

    solution: String,

    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Mistake", mistakeSchema);