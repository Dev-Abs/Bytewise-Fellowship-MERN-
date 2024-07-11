const fs = require('fs');

// fs.readFile('./files/starter.txt','utf8', (err, data) => {
//     if (err) throw err;
//     // console.log(data.toString());
//     console.log(data);
// })

const path = require('path')

fs.readFile(path.join(__dirname, 'files', 'starter.txt'),'utf8', (err, data) => {
    if (err) throw err;
    // console.log(data.toString());
    console.log(data);
})

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Hello World', err => {
    if (err) throw err;
    console.log('File has been written');
    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nfrom mars', err => {
        if (err) throw err;
        console.log('File has been appended');

        fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), err => {
            if (err) throw err;
            console.log('File has been renamed');
        });
    });
});


// appendFile will append the data to the existing file
// and create a new file if it does not exist


// fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), ' from mars', err => {
//     if (err) throw err;
//     console.log('File has been appended');
// });



// console.log(
//     'This is the first log'
// );


// exit on uncaught exception

process.on('uncaughtException', err => {
    console.log('There are some uncaught errors', err);
    process.exit(1);
}
);



const fsPromises = require('fs').promises;

const fileOps = async () => {
    // console.log('now using fs promises')
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        await fsPromises.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Hello World');
        console.log('File has been written (promise version)');
        await fsPromises.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nfrom mars');
        console.log('File has been appended (promise version)');
        await fsPromises.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'));
        console.log('File has been renamed (promise version)');
        // await fsPromises.unlink(path.join(__dirname, 'files', 'newReply.txt'));
        // console.log('File has been deleted (promise version)');
    }
    catch (err) {
        console.log(err);
    }
}

fileOps();