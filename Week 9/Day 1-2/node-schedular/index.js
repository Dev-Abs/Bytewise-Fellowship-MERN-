const express = require('express')
const app = express();

const cron = require('node-cron');

const fs = require('fs');


cron.schedule('*/10 * * * * *', function(){
    console.log('running a task every  10 second')
    const date = new Date();
    const data = `Task ran at ${date} \n`;
    fs.appendFile('log.txt', data, (err)=>{
        if(err){
            console.log(err)
        }
    })
})

app.listen(3000, (req,res)=>{
    console.log('Server is running on port 3000')
})