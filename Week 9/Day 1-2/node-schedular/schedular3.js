// schedular for data housekeeping older then 180 days
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const archive = require("./data/archive.json");

const housekeepingTask = () => {
    console.log("Running housekeeping task at: ", new Date().toISOString());
    try {
        archive.map((item, index) => {
            const invoiceDate = new Date(item.date);
            const currentDate = new Date().getTime();
            const days = Math.floor((currentDate - invoiceDate.getTime()) / (1000 * 3600 * 24));
            // console.log('The number of days are: ', Math.floor((currentDate - invoiceDate.getTime()) / (1000 * 3600 * 24)));
            console.log('The number of days are: ', days);
                if (days > 180) {
                //     archive.splice(archive.findIndex((i) => i.date == item.date), 1);
                archive.splice(index, 1);
                fs.writeFileSync(path.join(__dirname, "data", "archive.json"), JSON.stringify(archive), "utf-8");
            }
        });
    } catch (error) {
        console.log("Error in housekeeping task: ", error);
    }
    console.log("housekeeping task ended");
};

cron.schedule("* * * * * *", housekeepingTask);
