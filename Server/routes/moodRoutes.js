const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");

const { createMood, getUserMoods } = require("../controllers/moodController");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/', authMiddleware, createMood);
router.get('/', authMiddleware, getUserMoods);
router.delete("/", authMiddleware, async (req, res) => {
  try {
    const {songTitle, songUrl } = req.body;
    const userId = req.user._id;

    await Mood.deleteOne({ userId, songTitle, songUrl });

    res.json({ message: "Deleted from mood history" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete" });
  }
});
// DELETE /api/moods/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Mood.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deleted) return res.status(404).json({ message: "Mood not found" });
    res.json({ message: "Mood deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;