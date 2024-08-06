const express = require('express')
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const customCron = require('./cron');
customCron();
app.listen(3000, (req,res)=>{
    console.log('Server is running on port 3000')
})