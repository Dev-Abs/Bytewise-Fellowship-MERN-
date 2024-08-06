const User = require('./models/userModel');
const config = require('./config/config');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const sendMailToAllUsers = async (emailsObj) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPass
            }
        });
        const mailOptions = {
            from: config.emailUser,
            to: emailsObj,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('what is the error???????????????????');
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }
        );
    } catch (error) {
        console.log(error);
    }
}


const sendMailAllUsers = async () => {
    try {
        cron.schedule('*/10 * * * * *', async () => {
            const users = await User.find();
            if (users.length > 0) {
                var emails = [];
                users.map(user => {
                    emails.push(user.email);
                });
                // console.log(emails);
                sendMailToAllUsers(emails);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMailAllUsers;