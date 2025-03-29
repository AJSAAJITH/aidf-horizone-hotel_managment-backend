"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const MONGODB_URL = process.env.MONGODB_URL;
        if (!MONGODB_URL) {
            console.log("MONGODB_URL is not set");
            throw new Error("MONGODB_URL is not set");
        }
        const con = await mongoose_1.default.connect(MONGODB_URL);
        console.log(`Connected to the database... ${con.connection.host}`);
    }
    catch (error) {
        console.log("Error connecting to the database...");
        console.log(error);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map