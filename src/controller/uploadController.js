import { SuccessResponse } from '../core/success.reponse.js';
import { upload } from '../config/cloudinaryConfig.js';

class UploadController {


    static async uploadImage(req, res) {
        // Kiểm tra xem tệp đã được tải lên chưa
        if (!req.files || (!req.files.images && !req.files.videos)) {
            return res.status(400).json({ message: 'Không có tệp nào được tải lên' });
        }

        const imageUrls = req.files.images ? req.files.images.map(file => file.path) : []; // URL của ảnh trên Cloudinary
        const videoUrls = req.files.videos ? req.files.videos.map(file => file.path) : []; // URL của video trên Cloudinary

        // Gộp cả ảnh và video vào một mảng
        const allUploadedUrls = [...imageUrls, ...videoUrls];

        new SuccessResponse({
            message: 'Upload thành công!',
            data: allUploadedUrls,

        }).send(res);
    }
}

export default UploadController;
