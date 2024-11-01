import { SuccessResponse } from "../core/success.reponse.js"
import ProductService from "../service/productService.js"

class ProductController {
    static async createProduct(req, res) {
        new SuccessResponse({
            message: ' create product',
            data: await ProductService.createProduct(req.body)
        }).send(res)
    }
    static async getProduct(req, res) {
        const id = req.params.id
        new SuccessResponse({
            message: 'get product',
            data: await ProductService.getProduct(id)
        }).send(res)
    }
}
export default ProductController