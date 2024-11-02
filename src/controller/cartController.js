import { SuccessResponse } from "../core/success.reponse.js"
import CartService from "../service/cartService.js"
class CartController {
    static async addProductCart(req, res) {
        const userId = req.user.userId
        const { productId, quantity } = req.body
        console.log(productId)
        new SuccessResponse({
            message: 'add product to cart',
            data: await CartService.addProductCart(productId, quantity, userId)
        }).send(res)
    }
    static async getItemCart(req, res) {
        const userId = req.user.userId
        new SuccessResponse({
            message: 'get items in cart',
            data: await CartService.getItemCart(userId)
        }).send(res)
    }

    static async removeItems(req, res) {

        const userId = req.user.userId
        console.log('hello', userId)
        const { id } = req.params;
        new SuccessResponse({
            message: 'remove items',
            data: await CartService.removeItems(userId, id)
        }).send(res)

    }
}
export default CartController