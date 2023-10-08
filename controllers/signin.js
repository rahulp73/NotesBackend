const User = require('../schemas/user');
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const ErrorResponse = require('../util/errorResponse')

module.exports = async (req,res,next) => {
    console.log(req.body)
    const {userName, password} = req.body;
    try{
        const user = await User.findOne({ userName : userName })
        console.log(user)

        if(!user){
            res.send(JSON.stringify({'username' : 0}))
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            res.send(JSON.stringify({'password' : 0}))
            return
        } else {
            const token = JWT.sign({ _id : user._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
            console.log(token)
            res.json({status:200,token,body:user._id,name:user.name,username:user.userName,photo:user.photo})
        }
    } catch (error) {
        return next(new ErrorResponse(error.message,400))
    }
}