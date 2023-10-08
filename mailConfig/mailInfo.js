const nodeMailer = require('nodemailer')

const sendMail = async (options) => {
    // const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // const generateString = (length)=>{
    //     let result = '';
    //     const charactersLength = characters.length;
    //     for( let i = 0; i < length; i++ ) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    // }
    // generateString(5)
    const transporter = nodeMailer.createTransport({
        host : process.env.EMAIL_SERVICE,
        port : 465,
        secure : true,
        auth : {
            user : process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD
        }
    })
    const mailOptions = {
        from : process.env.EMAIL_FROM,
        to : options.to,
        subject: options.subject,
        html : options.html,
    }
    transporter.sendMail (mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
          return "Email Sent Successfully!"
        }
      })
}

module.exports = sendMail