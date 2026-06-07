import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";
dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(
  "/api/learning",
  learningRoutes
);
app.get("/", (req, res) => {
  res.send("Engineer Hub Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});