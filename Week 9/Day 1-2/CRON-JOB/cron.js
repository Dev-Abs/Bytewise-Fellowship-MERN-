const User = require('./models/userModel');
const config = require('./config/config');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const sendMailAllUsers = async () => {
    try {
        cron.schedule('*/1 * * * *', async () => {
            const users = await User.find();
            if (users.length > 0) {
                var emails = [];
                users.map(user => {
                    emails.push(user.email);
                });
                console.log(emails);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMailAllUsers;