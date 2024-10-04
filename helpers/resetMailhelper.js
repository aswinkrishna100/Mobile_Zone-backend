const nodemailer = require('nodemailer')

const sendResetPasswordMail = async(email,link)=>{
    var transporter = nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:process.env.SENDER_EMAIL,
            pass : process.env.SENDER_EMAIL_PASSWORD
        }
    })
    try{
        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:'Reset Password',
            html:`<b>Your Reset Password Link : ${link}<b/>`
        }
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err);
            }else{
                console.log('Email Sent Successfully');
            }
        })
    }catch(err){
        console.log('Error for Email sending');
        throw err
    }
}

module.exports = sendResetPasswordMail