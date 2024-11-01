// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Vui lòng nhập tên người dùng"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Vui lòng nhập email"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
    },
    password: {
        type: String,
        required: [true, "Vui lòng nhập mật khẩu"],
    },
    image: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);

export default User;