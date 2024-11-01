import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
class AuthService {
    static async userLogin(email, password) {
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            throw new Error('Người dùng không tồn tại hoặc không có mật khẩu hợp lệ');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Mật khẩu không chính xác');
        }
        // Tạo JWT token
        const payload = {
            userId: user._id,
            email: user.email,
            username: user.username
        };
        const access_token = jwt.sign(
            payload,
            process.env.JWT_KEY,
            { expiresIn: process.env.JWT_EXPIRES }
        );
        return { access_token };
    }
}
export default AuthService