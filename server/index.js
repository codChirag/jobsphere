const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const Job = require('./models/Job');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Upload resume + extract skills
app.post('/api/upload', async (req, res) => {
  const { resumeText, userId } = req.body;
  const response = await axios.post('http://localhost:5001/extract', { text: resumeText });
  const skills = response.data.skills;
  await User.findByIdAndUpdate(userId, { skills });
  res.json({ skills });
});

// Recommend jobs
app.get('/api/recommend/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  const response = await axios.post('http://localhost:5001/recommend', { skills: user.skills });
  res.json(response.data);
});

app.listen(5000, () => console.log("Server running on port 5000"));
