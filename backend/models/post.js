const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    username: { type: String, required: true },
    category: { type: Array, required: true },
    timestamp: { type: Date, default: Date.now },
});

// Use this to prevent recompilation
module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);
