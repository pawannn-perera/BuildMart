"use server";
import stripe from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  customerPhone: string; //New
}
interface CartItems {
  products: CartItem["product"];
  quantity: number;
}

export async function createCheckoutSession(
  items: CartItem[],
  metadata: Metadata
) {
  try {
    // Fetch the customer based on email
    const customers = await stripe.customers.list({
      email: metadata?.customerEmail,
      limit: 1,
    });
    const customerId =
      customers.data.length > 0 ? customers.data[0].id : "";

    // Prepare session payload for Stripe Checkout session
    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata?.orderNumber,
        customerName: metadata?.customerName,
        customerEmail: metadata?.customerEmail,
        clerkUserId: metadata?.clerkUserId,
        customerPhone: metadata?.customerPhone, // new
      },
      phone_number_collection: {
        // Add phone number collection
        enabled: true,
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      success_url: `https://buildmartstore.vercel.app/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `https://buildmartstore.vercel.app/cart`,

      // Line items (products)
      line_items: items.map((item) => ({
        price_data: {
          currency: "LKR",
          unit_amount: Math.round(item.product.price! * 100), // Price in cents
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: item.product.description,
            metadata: { id: item.product._id },
            images:
              item.product.images && item.product.images.length > 0
                ? [urlFor(item.product.images[0]).url()]
                : undefined,
          },
        },
        quantity: item.quantity,
      })),

      // Shipping address collection (country restriction)
      shipping_address_collection: { allowed_countries: ["LK"] },

      // Shipping options (Standard & Express)
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 35000, currency: "LKR" }, // Standard shipping LKR500
            display_name: "Standard Shipping (5 days)",
            delivery_estimate: {
              minimum: { unit: "day", value: 5 },
              maximum: { unit: "day", value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 50000, currency: "LKR" }, // Express shipping LKR1000
            display_name: "Express Shipping (2 days)",
            delivery_estimate: {
              minimum: { unit: "day", value: 2 },
              maximum: { unit: "day", value: 2 },
            },
          },
        },
      ],
    };

    // Set customer ID or email if no customer ID is found
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionPayload);

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
