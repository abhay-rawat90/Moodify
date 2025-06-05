const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true},
    moodText: { type: String, required: true},
    songTitle: { type: String },
    songUrl: { type: String },
    createdAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model('Mood', moodSchema);