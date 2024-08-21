require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
    [1, {priceInCents: 10000, name: 'Learn React Today'}],
    [2, {priceInCents: 20000, name: 'Learn CSS Today'}]
]);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});