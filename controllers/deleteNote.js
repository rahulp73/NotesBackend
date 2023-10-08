const deletedNote = require('../schemas/deletedNote')
const note = require('../schemas/note')

module.exports = async (req,res) => {
    console.log(req.body)
    const notes = await note.findOne({ _id : req.body.id})
    console.log(notes)
    await deletedNote.create({ userId : notes.userId, note : notes.note})
    await note.deleteOne({ _id : req.body.id })
    res.contentType('application/json')
    res.status(200).send("Successful")
}