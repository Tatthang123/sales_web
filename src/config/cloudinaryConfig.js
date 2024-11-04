// config/uploadConfig.js
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();
// Cấu hình Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Định nghĩa giới hạn dung lượng tệp (20 MB trong ví dụ này)
const MAX_SIZE = 20 * 1024 * 1024; // 20 MB

// Tạo storage cho Multer với Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'uploads', // Folder để lưu trữ ảnh và video trên Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov'], // Định dạng cho ảnh và video
    },
});
// Tạo multer với storage và giới hạn kích thước
const upload = multer({
    storage: storage,
    limits: {
        fileSize: MAX_SIZE, // Giới hạn kích thước tệp
    },
}).fields([
    { name: 'images', maxCount: 100 }, // Tối đa 100 ảnh
    { name: 'videos', maxCount: 10 },   // Tối đa 10 video
]);
// Xuất upload và cloudinary
export { upload, cloudinary };
