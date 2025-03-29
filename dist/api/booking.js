"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var booking_1 = require("../application/booking");
var authentication_middleware_1 = require("./middleware/authentication_middleware");
var bookingsRouter = express_1.default.Router();
bookingsRouter.route("/").get(booking_1.getAllBookings).post(authentication_middleware_1.isAuthenticated, booking_1.createBooking);
bookingsRouter.route("/hotels/:hotelId").get(booking_1.getAllBookingsForHotel);
exports.default = bookingsRouter;
//# sourceMappingURL=booking.js.map