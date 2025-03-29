"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmberdding = void 0;
const mongodb_1 = require("@langchain/mongodb");
const openai_1 = require("@langchain/openai");
const mongoose_1 = __importDefault(require("mongoose"));
const Hotel_1 = __importDefault(require("../infrastructure/schemas/Hotel"));
const documents_1 = require("@langchain/core/documents");
const createEmberdding = async (req, res, next) => {
    try {
        const emberdingModels = new openai_1.OpenAIEmbeddings({
            model: "text-embedding-ada-002",
            apiKey: process.env.OPENAI_API_KEY
        });
        const vectorIndex = new mongodb_1.MongoDBAtlasVectorSearch(emberdingModels, {
            collection: mongoose_1.default.connection.collection("hotelVectors"),
            indexName: "vector_index",
        });
        const hotels = await Hotel_1.default.find({});
        const docs = hotels.map((hotel) => {
            const { _id, location, price, description } = hotel;
            const doc = new documents_1.Document({
                pageContent: `${description} Located in ${location}. Price per night: ${price}`,
                metadata: {
                    _id,
                }
            });
            return doc;
        });
        await vectorIndex.addDocuments(docs);
        res.status(200).json({
            message: "Emberdding create successfully."
        });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};
exports.createEmberdding = createEmberdding;
//# sourceMappingURL=embedding.js.map