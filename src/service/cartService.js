import { NotFoundError } from "../core/error.reponse.js";
import Cart from "../model/cartModel.js";
import Product from "../model/productModel.js";

class CartService {
    static async addProductCart(productId, quantity, userId) {
        const product = await Product.findById(productId);
        if (!product) {
            throw new NotFoundError('Product Not Found');
        }
        const productPrice = product.price;
        const totalPrice = productPrice * quantity;
        const cart = await Cart.findOne({ userId: userId });
        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId: productId, quantity: quantity });
            }
            cart.totalAmount = cart.items.reduce((total, item) => {
                const price = product.price * item.quantity; // Tính giá cho từng sản phẩm
                return total + price; // Cộng dồn tổng tiền
            }, 0);
            await cart.save();
            return cart;
        } else {
            return await Cart.create({
                userId: userId,
                items: [{ productId: productId, quantity: quantity }],
                totalAmount: totalPrice,
            });
        }
    }
    static async getItemCart(userId) {
        const items = await Cart.findOne({ userId: userId }).populate('items.productId', 'name price _id')
        if (!items) {
            throw new NotFoundError('Not found')
        }
        return items
    }
    static async removeItems(userId, itemId) {
        // Tìm giỏ hàng của người dùng
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            throw new NotFoundError('Cart not found');
        }
        // Tìm index của sản phẩm trong giỏ hàng dựa vào itemId
        const itemIndex = cart.items.findIndex(item => item._id.equals(itemId));
        if (itemIndex === -1) {
            throw new NotFoundError('Item not found in Cart');
        }
        // Lấy thông tin sản phẩm để tính toán
        const productId = cart.items[itemIndex].productId;
        const quantity = cart.items[itemIndex].quantity;
        // Tìm sản phẩm trong cơ sở dữ liệu để lấy giá
        const product = await Product.findById(productId);
        if (!product) {
            throw new NotFoundError('Product not found');
        }
        // Tính toán tổng tiền cần trừ
        const totalPriceToDeduct = product.price * quantity;
        // Xóa sản phẩm khỏi giỏ hàng
        cart.items.splice(itemIndex, 1);
        // Cập nhật tổng tiền cho giỏ hàng
        cart.totalAmount -= totalPriceToDeduct;
        // Lưu giỏ hàng đã cập nhật
        await cart.save();
        return cart;
    }
}
export default CartService;
