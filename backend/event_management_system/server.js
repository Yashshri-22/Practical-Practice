const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/eventDB');

// 2. Schema: Name, Email, and the specific Event they are joining
const participantSchema = new mongoose.Schema({
    name: String,
    email: String,
    eventName: String
});
const Participant = mongoose.model('Participant', participantSchema);

// 3. API to Save Participant
app.post('/register', async (req, res) => {
    try {
        const p = new Participant(req.body);
        await p.save();
        res.status(200).send({ message: "Registration Successful!" });
    } catch (err) {
        res.status(500).send(err);
    }
});

// 4. API to Retrieve Participants
app.get('/participants', async (req, res) => {
    const list = await Participant.find();
    res.json(list);
});

app.listen(5000, () => console.log("Event Server running on port 5000"));