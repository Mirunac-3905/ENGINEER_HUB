import mongoose from "mongoose";

const learningSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    resource: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Learning", learningSchema);