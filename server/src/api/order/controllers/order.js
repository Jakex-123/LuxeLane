"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;
    const {products, userName, email}=data;
    try {
      // retrieve item information
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);

            return {
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: item.name,
                  },
                  unit_amount: item.price * 100,
                },
                quantity: product.count,
              };
            })
          );
      // create a stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "https://luxelane-sage.vercel.app/checkout/success",
        cancel_url: "https://luxelane-sage.vercel.app",
        line_items: lineItems,
      });

      // create the item
      await strapi
        .service("api::order.order")
        .create({ data: { userName, products, stripeSessionId: session.id } });

      // return the session id
      return { id: session.id };
    } catch (error) {
        console.log(error)
      return(error)
    }
  },
}));
