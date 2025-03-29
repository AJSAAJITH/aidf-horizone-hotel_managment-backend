"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./infrastructure/db"));
var hotel_1 = __importDefault(require("./api/hotel"));
var user_1 = __importDefault(require("./api/user"));
var booking_1 = __importDefault(require("./api/booking"));
var cors_1 = __importDefault(require("cors"));
var global_error_handding_middleware_1 = __importDefault(require("./api/middleware/global-error-handding-middleware"));
var express_2 = require("@clerk/express");
// Create an Express instance
var app = (0, express_1.default)();
// Apply centralized middleware
app.use((0, express_2.clerkMiddleware)());
// Middleware to parse JSON data in the request body
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "https://aidf-horizone-frontend-saajith.netlify.app" }));
app.use("/api/hotels", hotel_1.default);
app.use("/api/users", user_1.default);
app.use("/api/bookings", booking_1.default);
app.use(global_error_handding_middleware_1.default);
// Define the port to run the server
(0, db_1.default)();
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Server Starting with Port: ".concat(PORT));
});
//# sourceMappingURL=index.js.map