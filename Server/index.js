const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const moodRoutes = require("./routes/moodRoutes");
const aiRoutes = require("./routes/ai");
const ytRoutes = require("./routes/youtubeRoute");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/moods',moodRoutes);
app.use('/api/ai-song',aiRoutes);
app.use('/api/youtube',ytRoutes);
app.get('/', async (req, res) => {
    res.send('API is working');
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error(err));