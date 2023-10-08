const deletedNote = require('../schemas/deletedNote')

module.exports = async (req,res) => {
    console.log(req.body)
    const delNotes = await deletedNote.find({ userId : req.body.id})
    console.log(delNotes)
    res.contentType('application/json')
    res.send(JSON.stringify(delNotes))
}