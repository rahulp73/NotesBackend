const note = require("../schemas/note")

module.exports = async (req,res) => {
    console.log(req.body)
    const notes = await note.findOneAndUpdate({_id : req.body.id}, {note : req.body.note}, {new : true})
    console.log(notes)
    const notes1 = await note.find({ userId : notes.userId })
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(notes1))
}