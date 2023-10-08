const deletedNote = require("../schemas/deletedNote")
const note = require("../schemas/note")

module.exports = async (req,res) => {
    console.log(req.body)
    const notes = await deletedNote.findOne({ _id : req.body.id })
    console.log(notes)
    await note.create({ userId : notes.userId, note: notes.note})
    await deletedNote.deleteOne({ _id : req.body.id })
    res.contentType('application/json')
    res.status(200).send("Successful")
}