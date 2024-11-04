// routes/uploadRoutes.js
import express from 'express';
import UploadController from '../controller/uploadController.js';
import { upload } from '../config/cloudinaryConfig.js'; // Import upload từ config

const routerUpload = express.Router();

// Route tải ảnh lên
routerUpload.post('/upload-image', upload, UploadController.uploadImage);

export default routerUpload;
