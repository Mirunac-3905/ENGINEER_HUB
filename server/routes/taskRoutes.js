import express from "express";
import Task from "../models/tasks.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      status,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// GET ALL TASKS
router.get("/", authMiddleware, async (req, res) => {
  try {

    const tasks = await Task.find({
      user: req.user.id,
    });

    res.json({
      success: true,
      tasks,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// UPDATE TASK
router.put("/:id", authMiddleware, async (req, res) => {
  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Task deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;