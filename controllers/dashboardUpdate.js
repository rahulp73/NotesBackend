const user = require("../schemas/user")

module.exports = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    const User = await user.findOneAndUpdate({_id : req.body.id}, {name : req.body.name, photo : req.file.filename})
    console.log(User)
    res.send(JSON.stringify({imageName : User.photo}))
}