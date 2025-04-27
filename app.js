//required imports
const express = require("express");
const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
var cors = require("cors");

//activate server
const app = express();
app.use(cors());
const router = express.Router();
app.use("/api", router);
app.listen(3000);


//connect to mongoDB
mongoose.connect("mongodb+srv://FPAdmin:Y8imOPz5a0wHIwBQ@fpcluster1.5h639vi.mongodb.net/School?retryWrites=true&w=majority&appName=FPCluster1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB Atlas:', err));




//define Mongoose Schema
const courseSchema = new Schema({
    courseName: {type: String, required: true},
    description: {type: String, required: true},
    subjectArea: {type: String, required: true},
    credits: {type: Number, required: true, min: 1, max: 3},
});

const Course = model('Course', courseSchema);

//create new course
const newCourse = new Course({
    courseName: "English 101",
    description: "Introduction to College-level writing.",
    subjectArea: "English",
    credits: 3
});

newCourse.save()
    .then(doc => {
    console.log("New course created:", doc);
    })
    .catch(err => {
    console.error("Error creating course:", err);
    });






//make api using routes
//routes handle browser requests but look like URLs. Functions are used to dynamically handle routes



// GET /courses — fetch all courses
router.get("/courses", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
        } catch (err) {
            console.error("Error fetching courses:", err);
            res.status(500).json({ error: "Failed to fetch courses" });
        }
});



