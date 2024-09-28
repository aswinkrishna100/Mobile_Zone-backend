const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    isverified:{
        type:Boolean,
        default: false
    },
    role:{
        type:Number,
        default:0
    }
})

const users = mongoose.model('users',userSchema)
module.exports = users
