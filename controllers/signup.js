const sendMail = require('../mailConfig/mailInfo');
const User = require('../schemas/user');
const ErrorResponse = require('../util/errorResponse')

module.exports = async (req,res,next) => {
    const {userName, name, password} = req.body;
    try{
        const isValid = await User.findOne({ userName : userName })
        console.log(isValid)
        if(isValid){
            res.send(JSON.stringify({'id' : 0}))
            return
        }
        const user = await User.create({
            userName, password, name
        })
        console.log(user)
        res.send(JSON.stringify({'status':200, 'id' : user._id, 'name' : user.name, 'username' : user.userName, 'photo' : user.photo}))

        // try{
        //     let message = `<h1>Hello ${name},</h1><br/><p>Thank you for using the clone keep`
        //     await sendMail({to: user.userName, subject: 'SignUp Success', html : message});
        // } catch(err) {
        //     return next(new ErrorResponse("Email Could not be Sent", 500))
        // }
    } catch (error) {
        return next(new ErrorResponse(error.message))
    }
}