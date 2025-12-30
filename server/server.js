require('dotenv').config(); // 👈 1. Add this line at the very top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());

// 2. Use process.env variables (DO NOT PASTE URLS HERE)
const MONGO_URI = process.env.MONGO_URI; 
const JWT_SECRET = process.env.JWT_SECRET;

// 1. Connect to Database
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

// 2. Define Database Models
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

const TaskSchema = new mongoose.Schema({
  userId: String,
  title: String
});
const Task = mongoose.model('Task', TaskSchema);

// 3. Routes

// REGISTER
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, password: hashedPassword });
    res.json(user);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.json({ token, email: user.email });
});

// GET TASKS (Protected)
app.get('/api/tasks', async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Auth required' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const tasks = await Task.find({ userId: decoded.userId });
    res.json(tasks);
  } catch (e) { res.status(401).json({ error: 'Invalid token' }); }
});

// ADD TASK (Protected)
app.post('/api/tasks', async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Auth required' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const task = await Task.create({ userId: decoded.userId, title: req.body.title });
    res.json(task);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(5000, () => console.log('✅ Server running on port 5000'));