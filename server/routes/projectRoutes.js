import express from "express";
import Project from "../models/Project.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      project,
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
    const projects = await Project.find({
      user: req.user.id,
    });

    res.json({
      success: true,
      projects,
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

    await Project.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Project deleted",
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
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    console.log("UPDATED PROJECT:", project);

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
export default router;