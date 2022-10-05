const mongoose = require("mongoose");

const youtubeSchema = new mongoose.Schema({
    channel_name: String,
    type: String,
    total_videos: Number 
});

module.exports = mongoose.model("videos", youtubeSchema);