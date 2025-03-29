"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookingsForHotel = exports.getAllBookings = exports.createBooking = void 0;
const Booking_1 = __importDefault(require("../infrastructure/schemas/Booking"));
const mongoose_1 = __importDefault(require("mongoose"));
const booking_1 = require("../domain/dtos/booking");
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const express_1 = require("@clerk/express");
// post - create new booking -
const createBooking = async (req, res, next) => {
    try {
        const booking = booking_1.createBookingDTO.safeParse(req.body);
        if (!booking.success) {
            throw new not_found_error_1.default(booking.error.message);
        }
        const userId = req?.auth?.userId;
        // Add the booking 
        const bookingData = await Booking_1.default.create({
            hotelId: booking.data.hotelId,
            userId: userId,
            checkIn: booking.data.checkIn,
            checkOut: booking.data.checkOut,
            roomNumber: booking.data.roomNumber,
        });
        // Return the response
        res.status(201).json({ success: true, message: "booking added", data: bookingData });
        return;
    }
    catch (error) {
        // console.log(`createBooking Error: ${error.message}`);
        next(error);
    }
};
exports.createBooking = createBooking;
// get all booking - 
const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking_1.default.find();
        res.status(200).json({ data: bookings });
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBookings = getAllBookings;
const getAllBookingsForHotel = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    // Validate hotelId
    if (!mongoose_1.default.Types.ObjectId.isValid(hotelId)) {
        res.status(400).json({ message: "Invalid hotel ID" });
        return;
    }
    try {
        // const bookings = await Booking.find({ hotelId: hotelId }).populate("userId", "name email");
        const bookings = await Booking_1.default.find({ hotelId: hotelId });
        const bookingWithUser = await Promise.all(bookings.map(async (el) => {
            const user = await express_1.clerkClient.users.getUser(el.userId);
            return { _id: el._id, hotelId: el.hotelId, checkIn: el.checkIn, checkOut: el.checkOut, roomNumber: el.roomNumber, user: { id: user.id, firstName: user?.firstName, lastName: user?.lastName } };
        }));
        res.status(200).json({ success: true, data: bookingWithUser });
    }
    catch (error) {
        console.error("Error fetching bookings:", error);
        // res.status(500).json({ message: "Internal server error" });
        next(error);
    }
};
exports.getAllBookingsForHotel = getAllBookingsForHotel;
//# sourceMappingURL=booking.js.map