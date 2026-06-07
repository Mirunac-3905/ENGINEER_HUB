import express from "express";
import Learning from "../models/Learning.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Topic from "../models/Topic.js";
import Note from "../models/Note.js";
import Question from "../models/Question.js";
import Mistake from "../models/Mistake.js";
const router = express.Router();
router.get("/", authMiddleware, async (req, res) => {
  try {
    const topics = await Learning.find({
      user: req.user.id,
    });

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
router.post("/", authMiddleware, async (req, res) => {
  try {
    const topic = await Learning.create({
      ...req.body,
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
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const topic = await Learning.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    );

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
    await Learning.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//GET ALL TOPICS
router.get("/topics", async (req, res) => {
  const topics = await Topic.find();

  res.json(topics);
});
router.post("/topics", async (req, res) => {
  const topic = await Topic.create(req.body);

  res.status(201).json(topic);
});

router.put("/topics/:id", async (req, res) => {
  const topic = await Topic.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(topic);
});

router.delete("/topics/:id", async (req, res) => {
  await Topic.findByIdAndDelete(req.params.id);

  res.json({
    message: "Topic Deleted",
  });
});

//NOTES APIs
// GET NOTES OF A TOPIC

router.get("/topics/:topicId/notes", async (req, res) => {
  const notes = await Note.find({
    topicId: req.params.topicId,
  });

  res.json(notes);
});


router.post("/topics/:topicId/notes", async (req, res) => {
  const note = await Note.create({
    ...req.body,
    topicId: req.params.topicId,
  });

  res.status(201).json(note);
});

router.put("/notes/:id", async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(note);
});

router.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);

  res.json({
    message: "Note Deleted",
  });
});

//QUESTIONS APIs
// GET QUESTIONS

router.get("/topics/:topicId/questions", async (req, res) => {
  const questions = await Question.find({
    topicId: req.params.topicId,
  });

  res.json(questions);
});

router.post("/topics/:topicId/questions", async (req, res) => {
  const question = await Question.create({
    ...req.body,
    topicId: req.params.topicId,
  });

  res.status(201).json(question);
});

router.put("/questions/:id", async (req, res) => {
  const question = await Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(question);
});

router.delete("/questions/:id", async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);

  res.json({
    message: "Question Deleted",
  });
});

//MISTAKES APIs
// GET MISTAKES

router.get("/topics/:topicId/mistakes", async (req, res) => {
  const mistakes = await Mistake.find({
    topicId: req.params.topicId,
  });

  res.json(mistakes);
});

router.post("/topics/:topicId/mistakes", async (req, res) => {
  const mistake = await Mistake.create({
    ...req.body,
    topicId: req.params.topicId,
  });

  res.status(201).json(mistake);
});

router.put("/mistakes/:id", async (req, res) => {
  const mistake = await Mistake.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(mistake);
});

router.delete("/mistakes/:id", async (req, res) => {
  await Mistake.findByIdAndDelete(req.params.id);

  res.json({
    message: "Mistake Deleted",
  });
});
export default router;