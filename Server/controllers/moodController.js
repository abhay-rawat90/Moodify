const Mood = require("../models/Mood");

exports.createMood = async (req,res) => {
    const { moodText, songTitle, songUrl } = req.body;
    console.log(req.user);
    const userId = req.user.id;
    

    try{
        const mood = await Mood.create({userId, moodText,songTitle, songUrl});
        res.status(201).json(mood);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message: "Failed to save Update"});
    }
};

exports.getUserMoods = async (req,res) => {
    try{
        const moods = await Mood.find({userId: req.user.id}).sort({createdAt: -1});
        res.status(200).json(moods);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Error Retrieving Moods"});

    }
};