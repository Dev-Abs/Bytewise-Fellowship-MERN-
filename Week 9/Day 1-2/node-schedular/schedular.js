const cron = require('node-cron')

const task = () => {
    console.log('Running scheduled task at: ', new Date())
}

cron.schedule('* * * * * *', task)