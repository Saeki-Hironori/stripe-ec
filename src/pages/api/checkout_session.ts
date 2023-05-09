import Stripe from "stripe";

export default async function handler(req: any, res: any) {
  if (req.method.toLocaleLowerCase() !== "post") {
    return res.status(405).end();
  }

  try {
    const { price, quantity } = req.body;
    const stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: "2020-08-27",
      maxNetworkRetries: 3,
    });
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price,
          quantity,
          // 個数の変更をサポートする
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
          },
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/",
    });
    res.redirect(301, session.url);
  } catch (e: any) {
    console.log(e);
    res.status(e.statusCode || 500).json({
      message: e.message,
    });
  }
}
