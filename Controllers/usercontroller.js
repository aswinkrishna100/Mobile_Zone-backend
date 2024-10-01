const users = require('../Models/userModel')
const bcrypt = require('bcrypt')
const otpGenerator = require('otp-generator')
const sendOtpVerificationEmail = require('../helpers/sendMailhelper')
const jwt = require('jsonwebtoken')

exports.addUser = async(req,res)=>{    
    const {fname,lname,address,email,password} = req.body

    try{
        if(!fname || !lname || !address || !email || !password){
            res.status(406).json("Please fill the Form Completely")
        }else{
            const existingUSer = await users.findOne({email})
            if(existingUSer){
                res.status(406).json("User Already Exists")
            }else{
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password,saltRounds)
                const otp = otpGenerator.generate(6,{digits:true,upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
                const otpExpires = new Date(Date.now()+10*60*1000)
                const newuser = new users({fname,lname,address,email,password:hashedPassword,otp,otpExpires})
                await newuser.save()

                await sendOtpVerificationEmail(email,otp)
                res.status(200).json(newuser)
            }
        }
    }
    catch(err){
        res.status(500).json("Internal Server Error")
        console.log(err);        
    }
}

exports.verifiedOtp = async(req,res)=>{
    const {email,otp} = req.body

    try{
        if(!email  || !otp){
            res.status(406).json('Please fill the Form')
        }else{
            const existingUSer = await users.findOne({email})
            if(!existingUSer){
                res.status(406).json('User Not Found')
                return null
            }
            else if(existingUSer.otp != otp){
                res.status(406).json({message:"Invalid OTP"})
                return null
            }
            const date = new Date(Date.now())
            if(date > existingUSer.otpExpires  ){
                res.status(406).json({message:"OTP Expires"})
                return null
            }else{
                existingUSer.otp = null
                existingUSer.otpExpires = null
                existingUSer.isverified = true
                existingUSer.save()
                res.status(200).json("Email verified.. Please login")
            }
           
        }
    }
    catch(err){
        res.status(500).json('Internal Server Error')
        console.log(err);
    }
}

exports.resendOtp = async(req,res)=>{
    const {email,otp} =req.body

    try{
        if(!email || !otp){
            res.status(406).json('Please fill the Form Completely')
        }else{
            const existingUSer = await users.findOne({email})
            if(!existingUSer){
                res.status(404).json('User Not Found')
            }
            const date = new Date(Date.now())
            if(date < existingUSer.otpExpires){
                res.status(406).json("OTP already Sented")
            }else{
                const otp = otpGenerator.generate(6,{digits:true,upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
                const otpExpires = new Date(Date.now()+10*60*1000)
                await sendOtpVerificationEmail(email,otp)
                existingUSer.otp = otp
                existingUSer.otpExpires = otpExpires
                existingUSer.save()
                res.status(200).json("OTP Resend Successfully")
            }
        }
    }
    catch(err){
        res.status(500).json('Internal Server Error')
        console.log(err);
    }
}

exports.loginUser = async(req,res)=>{
    const {email,password} = req.body

    try{
        const existingUser = await users.findOne({email})
        if(!existingUser){
            res.status(404).json("User not Found") 
            return null
        }
        const match = await bcrypt.compare(password,existingUser.password)
        console.log(match);
        
        if(!match){
            res.status(404).json("Incorrect username and password")
            return null
        }else if(existingUser.isverified == false){
            res.status(406).json("Email not Verified")
            return null
        }

        const token = jwt.sign({userId:existingUser._id},"supersecretkey12345")
        res.status(200).send({existingUser,token, message:"Login Successful"})
        
    }
    catch(error){
        res.status(500).send("Internal Server Error")
        console.log(error);
    }
}

exports.getUser = async(req,res)=>{
    try{
     const userdetails = await users.find()
     res.status(200).json(userdetails)
   }
   catch(err){
     res.status(500).json("Internal Server Error")
     console.log(err);
   }
 }
 