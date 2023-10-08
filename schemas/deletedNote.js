const mongoose = require('mongoose');

const deletedNoteSchema = new mongoose.Schema({
    userId : String,
    note : String
})

module.exports = mongoose.model("deletedNote", deletedNoteSchema)