const fs = require('fs')
const path = require('path')

const rs = fs.createReadStream(path.join(__dirname, 'files', 'lorem.txt'), {  
    encoding: 'utf8'
    // highWaterMark: 1024
})


const ws = fs.createWriteStream(path.join(__dirname, 'files', 'lorem-copy.txt'))

rs.on('data', (chunk) => {
    console.log('chunk:', chunk)
    ws.write(chunk)
})

const wsPipe = fs.createWriteStream(path.join(__dirname, 'files', 'lorem-copy-pipe.txt'))

rs.pipe(wsPipe);