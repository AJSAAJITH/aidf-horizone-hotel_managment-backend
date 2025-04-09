import express from "express";
import {
  createBooking,
  getAllBookings,
  getAllBookingsForHotel,
  getBookingById
} from "../application/booking";
import { isAuthenticated } from "./middleware/authentication_middleware";

const bookingsRouter = express.Router();

bookingsRouter.route("/").get(getAllBookings).post(isAuthenticated, createBooking);
bookingsRouter.route("/hotels/:hotelId").get(isAuthenticated, getAllBookingsForHotel);
bookingsRouter.route("/:bookingId").get(isAuthenticated, getBookingById);

export default bookingsRouter;
