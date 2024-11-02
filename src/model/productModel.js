// models/User.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },

    images: [{ type: String }],

    createdAt: { type: Date, default: Date.now },
},
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;