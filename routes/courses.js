const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the Course schema
const courseSchema = new mongoose.Schema({
    courseName: String,
    description: String,
    subjectArea: String,
    credits: Number
});

// Create the model (only once in your project!)
const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

// GET /courses — fetch all courses
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
        } catch (err) {
            console.error("Error fetching courses:", err);
            res.status(500).json({ error: "Failed to fetch courses" });
        }
});

module.exports = router;