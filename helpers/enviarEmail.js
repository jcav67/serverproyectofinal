const nodemailer = require("nodemailer");
//send email
const sendEmail = async (email, token) => {
 
    var email = email;
    var token = token;
 
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAILUSER, // Your email id
            pass: process.env.EMAILPASSWORD // Your password
        }
    });
 
    var mailOptions = {
        from: process.env.EMAILUSER,
        to: email,
        subject: 'Reset Password Link - Tutsmake.com',
        html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/reset-password?token=' + token + '">link</a> to reset your password</p>'
 
    };
 
    mail.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(1)
        } else {
            console.log(0)
        }
    });
}






module.exports = {
    sendEmail
}
