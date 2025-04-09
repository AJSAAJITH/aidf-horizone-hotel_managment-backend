import express from "express";
import {
  createBooking,
  deleteAllBooking,
  getAllBookings,
  getAllBookingsForHotel,
  getBookingById
} from "../application/booking";
import { isAuthenticated } from "./middleware/authentication_middleware";

const bookingsRouter = express.Router();

bookingsRouter.route("/").get(getAllBookings).post(isAuthenticated, createBooking);
bookingsRouter.route("/hotels/:hotelId").get(isAuthenticated, getAllBookingsForHotel);
bookingsRouter.route("/:bookingId").get(isAuthenticated, getBookingById);



bookingsRouter.route("/delete").delete(deleteAllBooking);
export default bookingsRouter;
