// server setup
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
// const {errorHandler} = require('./middleware/errorMiddleware');
const app = express();

connectDB();
app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// blogs and user routes setup

app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



