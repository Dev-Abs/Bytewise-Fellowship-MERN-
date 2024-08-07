const { format } = require('date-fns');
console.log(format(new Date(), 'yyyy-MM-dd\tHH:mm:ss.SSSxxx'))

const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const { v4: uuid } = require('uuid');


const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    // console.log(logItem);

    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
    }
    catch (err) {
        // console.log(err);
    }
}

module.exports = logEvents;