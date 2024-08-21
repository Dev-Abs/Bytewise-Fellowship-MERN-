require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
    [1, {priceInCents: 10000, name: 'Learn React Today'}],
    [2, {priceInCents: 20000, name: 'Learn CSS Today'}]
]);

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id);
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                };
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`
        });
        res.json({url: session.url});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});