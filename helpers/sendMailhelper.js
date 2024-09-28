const nodemailer = require('nodemailer')

const sendOtpVerificationEmail = async(email,otp)=>{
    var transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:process.env.SENDER_EMAIL,
            pass:process.env.SENDER_EMAIL_PASSWORD
        }
    })
    try{
        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:'OTP for Account Verification',
            html:`<b>Your OTP code for account verification is: ${otp}.Do not share this OTP with anyone for security reasons</b>`
        }
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err);
            }else{
                console.log("Email Sent Successfully");
            }
        })
    }
    catch(error){
        console.log('Error for Email sending');
        throw error
    }
}

module.exports = sendOtpVerificationEmail
