const mongoose = require("mongoose");

const youtubeSchema = new mongoose.Schema({
    name: String,
    channel_name: String,
    channel_link: String,
    type: String,
    total_videos: Number,
    img: Array,
    description: String
});

module.exports = mongoose.model("videos", youtubeSchema);