import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
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

    content: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", noteSchema);