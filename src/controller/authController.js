import AuthService from "../service/authService.js";
import { SuccessResponse } from "../core/success.reponse.js";
import { BadRequestError } from "../core/error.reponse.js";

class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new BadRequestError("Vui lòng cung cấp email và mật khẩu");
        }
        const user = await AuthService.userLogin(email, password);
        new SuccessResponse({
            message: "Đăng nhập thành công",
            data: user
        }).send(res);
    }
}
export default AuthController