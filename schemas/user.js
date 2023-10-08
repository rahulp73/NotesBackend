const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName : {
        type :String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    photo : {
        type : String,
        default : 'default.png'
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : Date.now()
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      // if password did not change, move to next middleware
      next()
    }
    // salt creates random hash
    // const salt = await bcrypt.genSalt(10)
    // hash the password and update it
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

module.exports = mongoose.model("user", userSchema)