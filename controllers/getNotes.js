const note = require('../schemas/note')

module.exports = async (req,res) => {
    console.log(req.body)
    const notes = await note.find({ userId : req.body.id})
    console.log(notes)
    res.contentType('application/json')
    res.send(JSON.stringify(notes))
}