const deletedNote = require("../schemas/deletedNote")


module.exports = async (req,res) => {
    console.log(req.body)
    await deletedNote.deleteOne({ _id : req.body.id })
    res.contentType('application/json')
    res.status(200).send("Successful")
}