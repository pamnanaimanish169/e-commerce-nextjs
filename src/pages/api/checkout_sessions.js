const stripe = require('stripe')("sk_test_51MoJ19SD90OuzcFSC8BnwTE7MUFJDG6gabmNBRQyucjbZETsSOeN4nfyJSqLDJx8sBqFtcRTISQPA9an5E2kkuC200Zk8zqYTH");

export default async function handler(req, res) {

    const { cartList } = JSON.parse(req.body);
    const lineItems = [];

    for (const key in req.body) {
        cartList[key] && lineItems.push({
            price_data: {
                currency: 'INR',
                product_data: {
                    name: cartList[key]?.title,
                },
                unit_amount: cartList[key]?.price * 100
            },
            quantity: cartList[key]?.amount
        })
    }

    if (req.method === 'POST') {
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: [...lineItems],
                mode: 'payment',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            });

            res.send({url : session.url})
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}