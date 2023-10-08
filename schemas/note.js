const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    userId : String,
    note : String
})

module.exports = mongoose.model("note", noteSchema)