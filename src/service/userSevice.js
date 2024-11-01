
import User from "../model/userModel.js";
import { NotFoundError } from "../core/error.reponse.js";
import bcrypt from "bcrypt"
class userService {
    static async createUser(newUser) {
        const hashpassWord = await bcrypt.hash(newUser.password, 10);
        const usernew = await User.create({
            username: newUser.username,
            email: newUser.email,
            password: hashpassWord,
            image: newUser.image
        })
        if (!newUser) {
            {
                throw new NotFoundError('User creation endpoint not found')
            }
        }
        return usernew
    }
    static async getProfile(userId) {
        const user = await User.findOne({ _id: userId })
        if (!user) {
            throw new NotFoundError('User not found')
        }
        return user
    }
    static async updateProfile(userId, userBody) {
        const user = await User.updateOne({ _id: userId }, userBody)
        return user
    }
}
export default userService