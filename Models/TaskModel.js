const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
    
