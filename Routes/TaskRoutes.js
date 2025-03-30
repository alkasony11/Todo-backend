const express = require("express");
const router = express.Router();
const Task = require("../Models/TaskModel");

// Create a new task
router.post("/", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json({ message: "Task Added successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ date: -1 }); // Sort by date descending
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update task name
router.put("/:id", async (req, res) => {
    try {
        if (!req.body.name || !req.body.name.trim()) {
            return res.status(400).json({ error: "Task name is required" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { 
                name: req.body.name.trim(),
                date: Date.now() // Update the date when task is modified
            },
            { new: true }
        );
        
        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully!", task: updatedTask });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a task
router.delete("/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
