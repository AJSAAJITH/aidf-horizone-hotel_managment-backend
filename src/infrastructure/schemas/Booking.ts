import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  rooms_count: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID", "CANCELLED"],
    default: "PENDING",
  },
  paymentMethod: {
    type: String,
    enum: ["CARD", "BANK_TRANSFER"],
    default: "CARD",
  }
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
