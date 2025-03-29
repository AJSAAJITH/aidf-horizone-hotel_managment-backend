"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotel = exports.updateHotel = exports.getHotelById = exports.getAllHotels = exports.createHotel = exports.genarateResponce = void 0;
var hotel_1 = require("../domain/dtos/hotel");
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var Hotel_1 = __importDefault(require("../infrastructure/schemas/Hotel"));
var openai_1 = __importDefault(require("openai"));
// const hotels = [
// {
//   _id: "1",
//   name: "Montmartre Majesty Hotel",
//   location: "Paris, France",
//   rating: 4.7,
//   reviews: 2578,
//   image:
//     "https://cf.bstatic.com/xdata/images/hotel/max1280x900/297840629.jpg?k=d20e005d5404a7bea91cb5fe624842f72b27867139c5d65700ab7f69396026ce&o=&hp=1",
//   price: 160,
//   description:
//     "Stay in the heart of Paris, France, at the Montmartre Majesty Hotel, where elegance meets charm. Perfect for exploring iconic landmarks like the Eiffel Tower and the Louvre, this hotel offers a tranquil escape from the bustling city. With luxurious rooms starting at $160 per night, enjoy breathtaking rooftop views, exquisite French cuisine, and the romantic ambiance of Montmartre. Ideal for a dreamy city getaway.",
//   __v: 0,
// },
//   {
//     _id: "2",
//     name: "Loire Luxury Lodge",
//     location: "Sydney, Australia",
//     rating: 4.9,
//     reviews: 985,
//     image:
//       "https://cf.bstatic.com/xdata/images/hotel/max1280x900/596257607.jpg?k=0b513d8fca0734c02a83d558cbad7f792ef3ac900fd42c7d783f31ab94b4062c&o=&hp=1",
//     price: 350,
//     description:
//       "Overlooking Sydney Harbour, Loire Luxury Lodge provides unmatched waterfront views and a vibrant city experience. From $350 per night, relax in modern luxury while enjoying proximity to Sydney Opera House and Bondi Beach. Whether you're seeking adventure or relaxation, this hotel offers a harmonious blend of urban excitement and tranquil sophistication.",
//     __v: 0,
//   },
//   {
//     _id: "3",
//     name: "Tokyo Tower Inn",
//     location: "Tokyo, Japan",
//     rating: 4.6,
//     reviews: 875,
//     image:
//       "https://cf.bstatic.com/xdata/images/hotel/max1280x900/308797093.jpg?k=3a35a30f15d40ced28afacf4b6ae81ea597a43c90c274194a08738f6e760b596&o=&hp=1",
//     price: 180,
//     description:
//       "Discover the vibrant energy of Tokyo at Tokyo Tower Inn, located in the heart of Japan's bustling capital. For $180 per night, guests can enjoy modern comforts, panoramic city views, and access to iconic attractions like Shibuya Crossing and the Imperial Palace. Ideal for foodies, tech enthusiasts, and urban explorers.",
//     __v: 0,
//   },
// {
//   _id: "4",
//   name: "Sydney Harbour Hotel",
//   location: "Sydney, Australia",
//   rating: 4.8,
//   reviews: 1023,
//   image:
//     "https://cf.bstatic.com/xdata/images/hotel/max1280x900/84555265.jpg?k=ce7c3c699dc591b8fbac1a329b5f57247cfa4d13f809c718069f948a4df78b54&o=&hp=1",
//   price: 200,
//   description:
//     "Stay at Sydney Harbour Hotel and wake up to stunning harbour views in one of Australia's most iconic destinations. Starting at $200 per night, enjoy rooftop dining, modern facilities, and close proximity to Darling Harbour and Sydney's vibrant nightlife. Ideal for couples and city adventurers.",
//   __v: 0,
// },
//   {
//     _id: "5",
//     name: "Milan Central Suites",
//     location: "Milan, Italy",
//     rating: 4.5,
//     reviews: 670,
//     image:
//       "https://cf.bstatic.com/xdata/images/hotel/max1280x900/608273980.jpg?k=c7df20ffb25ae52b6a17037dc13f5e15b94a0fe253a9b9d0b656f6376eabec7d&o=&hp=1",
//     price: 140,
//     description:
//       "Nestled in the fashion capital of Milan, Italy, Milan Central Suites combines style and comfort for an unforgettable stay. At $140 per night, enjoy proximity to the Duomo and Galleria Vittorio Emanuele II, making it perfect for shoppers and culture enthusiasts alike.",
//     __v: 0,
//   },
//   {
//     _id: "6",
//     name: "Elysée Retreat",
//     location: "Kyoto, Japan",
//     rating: 4.8,
//     reviews: 1236,
//     image:
//       "https://cf.bstatic.com/xdata/images/hotel/max1280x900/606303798.jpg?k=514943d0025704b27396faf82af167468d8b50b98f311668f206f79ca36cb53d&o=&hp=1",
//     price: 150,
//     description:
//       "Immerse yourself in Kyoto's serene beauty at Elysée Retreat, a sanctuary of peace and tradition. Discover the charm of Japanese gardens, historic temples, and tea ceremonies, all just steps away. For $150 per night, indulge in authentic Kyoto hospitality, minimalistic elegance, and an unforgettable cultural experience tailored for nature lovers and tranquility seekers.",
//     __v: 0,
//   },
//   {
//     _id: "7",
//     name: "Versailles Vista Inn",
//     location: "Rome, Italy",
//     rating: 4.7,
//     reviews: 1356,
//     image:
//       "https://cf.bstatic.com/xdata/images/hotel/max1280x900/60307464.jpg?k=67ae35316203e2ec82d8e02e0cef883217cce9c436da581528b94ad6dee8e393&o=&hp=1",
//     price: 220,
//     description:
//       "Located in the historic heart of Rome, Italy, Versailles Vista Inn offers a touch of Renaissance luxury. Explore the Colosseum and Vatican City by day and retreat to opulent comfort at night. Starting at $220 per night, guests enjoy fine Italian dining, elegant interiors, and a prime location for experiencing Rome's timeless culture. Ideal for history buffs and luxury seekers.",
//     __v: 0,
//   },
//   {
//     _id: "8",
//     name: "Parisian Palace",
//     location: "Paris, France",
//     rating: 4.9,
//     reviews: 2135,
//     image:
//       "https://cf.bstatic.com/xdata/images/hotel/max1280x900/308794596.jpg?k=76bbd047a4f3773844efb15819a637f10fb98671244760fcd69cf26d1073b797&o=&hp=1",
//     price: 320,
//     description:
//       "Experience ultimate luxury at Parisian Palace, a gem in the heart of Paris, France. For $320 per night, immerse yourself in timeless elegance with grand interiors, Michelin-star dining, and breathtaking views of the Seine. Perfect for a romantic escape or a refined city retreat.",
//     __v: 0,
//   },
// ];
// The below are request handler functions
// create hotel - {{baseUrl}}/api/hotels/
var genarateResponce = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var prompt, client, completion;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prompt = (req === null || req === void 0 ? void 0 : req.body).prompt;
                client = new openai_1.default({
                    apiKey: process.env.OPENAI_API_KEY,
                });
                return [4 /*yield*/, client.chat.completions.create({
                        model: "gpt-4o",
                        messages: [
                            {
                                role: "system",
                                content: "You are assistant that will categorize the words that a user gives and give them labels and show an output. Return this response as in the following examples: user: Lake, Cat, Dog, Tree; response: [{label:Nature, words:['Lake', 'Tree']}, {label:Animals, words:['Cat', 'Dog']}] ",
                            },
                            { role: "user", content: prompt },
                        ],
                        store: true,
                    })];
            case 1:
                completion = _a.sent();
                res.status(200)
                    .json({
                    messages: {
                        role: "assistence",
                        content: completion.choices[0].message.content,
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
exports.genarateResponce = genarateResponce;
var createHotel = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hotel, hoteldata, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                hotel = hotel_1.createHotelDTO.safeParse(req.body);
                if (!hotel.success) {
                    throw new not_found_error_1.default("Invalid hotel data");
                }
                return [4 /*yield*/, Hotel_1.default.create({
                        name: hotel.data.name,
                        location: hotel.data.location,
                        image: hotel.data.image,
                        price: Number(hotel.data.price),
                        description: hotel.data.description,
                    })];
            case 1:
                hoteldata = _a.sent();
                // Return the response
                res.status(201).json({ success: true, message: "hotel created successfully", data: hoteldata });
                return [2 /*return*/];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createHotel = createHotel;
// promise sleep function
// const sleep = (ms)=> new Promise((resolve)=>setTimeout(resolve, ms));
// getAll hotels -get {{baseUrl}}/api/hotels/
var getAllHotels = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hotels, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Hotel_1.default.find()];
            case 1:
                hotels = _a.sent();
                // await sleep(5000);
                res.status(200).json({ length: hotels.length, data: hotels });
                return [2 /*return*/];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllHotels = getAllHotels;
// post middleware
// get hotel by id: -get {{baseUrl}}/api/hotels/67acda2277e1b687533ec5b1
var getHotelById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hotelId, hotel, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                hotelId = req.params.id;
                return [4 /*yield*/, Hotel_1.default.findById(hotelId)];
            case 1:
                hotel = _a.sent();
                if (!hotel) {
                    throw new not_found_error_1.default("Invalid hotel data");
                }
                res.status(200).json(hotel);
                return [2 /*return*/];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getHotelById = getHotelById;
// update hotels :id - put - 
var updateHotel = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hotelId, updatedHotel, updatedData, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hotelId = req.params.id;
                updatedHotel = req.body;
                // Validate the request data
                if (!updatedHotel.name ||
                    !updatedHotel.location ||
                    !updatedHotel.rating ||
                    !updatedHotel.reviews ||
                    !updatedHotel.image ||
                    !updatedHotel.price ||
                    !updatedHotel.description) {
                    throw new not_found_error_1.default("Invalid hotel data");
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Hotel_1.default.findByIdAndUpdate(hotelId, // The ID of the document to update
                    updatedHotel, // The data to update
                    { new: true } // Return the updated document
                    )];
            case 2:
                updatedData = _a.sent();
                // Check if the hotel was found and updated
                if (!updatedData) {
                    throw new not_found_error_1.default("hotel not found");
                }
                // Return the response
                res.status(200).json({ success: true, message: "Hotel updated", data: updatedData });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                // console.error("Error updating hotel:", error);
                // res.status(500).json({ success: false, message: "Internal server error." });
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateHotel = updateHotel;
// delete hotels :id - delete -
var deleteHotel = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hotelId, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                hotelId = req.params.id;
                // Delete the hotel
                return [4 /*yield*/, Hotel_1.default.findByIdAndDelete(hotelId)];
            case 1:
                // Delete the hotel
                _a.sent();
                // Return the response
                res.status(200).json({ success: true, message: "hotel deleted successful" });
                return [2 /*return*/];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteHotel = deleteHotel;
//# sourceMappingURL=hotel.js.map