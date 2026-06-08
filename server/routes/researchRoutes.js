import express from "express";
import ResearchTopic from "../models/ResearchTopic.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      company,
      industry,
      category,
      problemStatement,
      history,
      currentSituation,
      technologies,
      analysis,
      keyLearnings,
      sourceLinks,
      status,
    } = req.body;

    const topic = await ResearchTopic.create({
      title,
      company,
      industry,
      category,
      problemStatement,
      history,
      currentSituation,
      technologies,
      analysis,
      keyLearnings,
      sourceLinks,
      status,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const topics = await ResearchTopic.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json({
      success: true,
      topics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const topic = await ResearchTopic.findOne({ _id: req.params.id, user: req.user.id });
    if (!topic) {
      return res.status(404).json({ success: false, message: "Research topic not found" });
    }
    res.json({
      success: true,
      topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const topic = await ResearchTopic.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, 
      req.body,
      { new: true }
    );

    if (!topic) {
      return res.status(404).json({ success: false, message: "Research topic not found" });
    }

    res.json({
      success: true,
      topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const topic = await ResearchTopic.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!topic) {
      return res.status(404).json({ success: false, message: "Research topic not found" });
    }
    res.json({
      success: true,
      message: "Research topic deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
