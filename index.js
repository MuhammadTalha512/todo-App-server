import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import {TodoModel} from "./models/Todos.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());   
app.use(express.json());

const mongo_URL = process.env.DB_URL;

mongoose
  .connect(mongo_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/auth", authRoutes);

// CREATE TODO
app.post("/createTodo", async (req, res) => {
  try {
    const newTodo = new TodoModel(req.body);
    await newTodo.save();
    res.status(201).json({
      message: "Todo created successfully",
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// READ TODOS
app.get("/readTodos", async (req, res) => {
  const todos = await TodoModel.find();
  res.json(todos);
});

// UPDATE TODO
app.post("/updateTodo", async (req, res) => {
  await TodoModel.findByIdAndUpdate(req.body._id, {
    status: "Completed",
  });
  res.json({ message: "Todo updated" });
});

// DELETE TODO
app.post("/deleteTodo", async (req, res) => {
  await TodoModel.findByIdAndDelete(req.body._id);
  res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
