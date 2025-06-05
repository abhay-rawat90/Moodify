const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, reqiured: true,unique: true},
    email: { type: String, reqiured: true,unique: true },
    password: {type: String, required: true},
}, { timestamps: true});

module.exports = mongoose.model('User',userSchema);