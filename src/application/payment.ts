import { NextFunction, Request, Response, } from "express";
import Booking from "../infrastructure/schemas/Booking";
import Hotel from "../infrastructure/schemas/Hotel";
import stripe from "../infrastructure/stripe";
import { console } from "inspector";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const FRONTEND_URL =
    process.env.NODE_ENV === "production"
        ? "https://aidf-horizone-frontend-saajith.netlify.app"
        : "http://localhost:5173";

async function fillCheckoutSession(sessionId: string) {
    console.log("Filling checkout session with ID:", sessionId);

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items'],
    });

    if (!checkoutSession.metadata || !checkoutSession.metadata.bookingId) {
        throw new Error("Missing metadata or bookingId in checkout session.");
    }

    const booking = await Booking.findById(checkoutSession.metadata.bookingId);
    if (!booking) {
        throw new Error("Booking not found.");
    }

    // Check the Checkout Session's payment_status property
    // to determine if fulfillment should be peformed
    if (checkoutSession.payment_status !== 'unpaid') {
        // TODO: Perform fulfillment of the line items
        // TODO: Record/save fulfillment status for this
        // Checkout Session
        await Booking.findByIdAndUpdate(booking._id, {
            paymentStatus: "PAID",
        })
    }

}

export const handleWebhook = async (req: Request, res: Response) => {
    const payload = req.body;
    const sig = req.headers["stripe-signature"] as string;

    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        if (
            event.type === "checkout.session.completed" ||
            event.type === "checkout.session.async_payment_succeeded"
        ) {
            await fillCheckoutSession(event.data.object.id);

            res.status(200).send();
            return;
        }

    } catch (err) {
        if (err instanceof Error) {
            res.status(400).send(`Webhook Error: ${err.message}`);
        } else {
            res.status(400).send("Webhook Error: Unknown error");
        }
        return;
    }
}

export const createCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = req.body.bookingId;
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            throw new Error("Booking not found");
        }

        const hotel = await Hotel.findById(booking.hotelId);
        if (!hotel) {
            throw new Error("Hotel not found");
        }
        const checkIn = new Date(booking.checkIn);
        const checkout = new Date(booking.checkOut);
        const totalNights = Math.ceil((checkout.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

        if (!hotel.stripePriceId) {
            throw new Error("Stripe price ID is missing for this hotel");
        }

        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price: hotel.stripePriceId,
                quantity: totalNights,
            }],
            mode: 'payment',
            ui_mode: 'embedded',
            return_url: `${FRONTEND_URL}/booking/complete?session_id={CHECKOUT_SESSION_ID}`,
            metadata: {
                bookingId: req.body.bookingId,
            }
        });
        res.send({ clientSecret: session.client_secret });

    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({
            message: "Failed to create checkout session",
            error: error instanceof Error ? error.message : String(error)
        });
    }

}

export const retrieveSessionStatus = async (req: Request, res: Response) => {
    const checkoutSession = await stripe.checkout.sessions.retrieve(
        req.query.session_id as string,
    );
    if (!checkoutSession.metadata || !checkoutSession.metadata.bookingId) {
        throw new Error("Missing metadata or bookingId in revieve checkout session.");
    }
    const booking = await Booking.findById(checkoutSession.metadata.bookingId);
    if (!booking) {
        throw new Error("Booking not found.");
    }
    const hotel = await Hotel.findById(booking.hotelId);
    if (!hotel) {
        throw new Error("Hotel not found.");
    }
    res.status(200).json({
        bookingId: booking._id,
        booking: booking,
        hotel: hotel,
        status: checkoutSession.status,
        customer_email: checkoutSession.customer_details?.email,
        paymentStatus: booking.paymentStatus,
    });

}