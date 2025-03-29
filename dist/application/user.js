"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUser = void 0;
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const User_1 = __importDefault(require("../infrastructure/schemas/User"));
// create user - http://localhost:5000/api/users/
const createUser = async (req, res, next) => {
    try {
        const user = req.body;
        // Validate the request data
        if (!user.name || !user.email) {
            throw new not_found_error_1.default("Invalid user data");
            // res.status(400).json({
            //   message: "Please enter all required fields",
            // });
            // return;
        }
        // Add the user
        const userdata = await User_1.default.create({
            name: user.name,
            email: user.email,
        });
        // Return the response
        res.status(201).json({ success: true, message: "user created", data: userdata });
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User_1.default.find();
        res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=user.js.map