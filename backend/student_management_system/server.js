const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. Connect to MongoDB (Localhost)
mongoose.connect('mongodb://localhost:27017/studentDB');

// 2. Define Schema & Model
const studentSchema = new mongoose.Schema({
    name: String,
    roll: String,
    branch: String
});
const Student = mongoose.model('Student', studentSchema);

// 3. API: Save Student (Create)
app.post('/add', async (req, res) => {
    const s = new Student(req.body);
    await s.save();
    res.send({ message: "Saved!" });
});

// 4. API: Get All Students (Retrieve)
app.get('/all', async (req, res) => {
    const data = await Student.find();
    res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));