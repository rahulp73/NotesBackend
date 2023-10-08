const note = require("../schemas/note")

module.exports = async (req,res) => {
    await note.create({ userId : req.body.userId, note : req.body.note})
    const notes = await note.find({ userId : req.body.userId })
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(notes))
}