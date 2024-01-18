 const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    description: String,
    completed: Boolean
});

module.exports = mongoose.model("Todo", todoSchema);