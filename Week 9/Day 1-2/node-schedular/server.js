const express = require('express');
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;
const app = express();
dotenv.config();

// require('./schedular');
// require('./schedular2');
require('./schedular3');

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });