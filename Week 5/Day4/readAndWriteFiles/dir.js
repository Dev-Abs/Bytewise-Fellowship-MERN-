const fs = require('fs')
const path = require('path')

if (!fs.existsSync(path.join(__dirname, 'newDir'))) {
    fs.mkdirSync(path.join(__dirname, 'newDir'))
    console.log('Directory has been created')
} else {
    console.log('Directory already exists')
}

// delete directory

if (fs.existsSync(path.join(__dirname, 'newDir'))) {
    fs.rmdirSync(path.join(__dirname, 'newDir'))
    console.log('Directory has been deleted')
} else {
    console.log('Directory does not exist')
}

