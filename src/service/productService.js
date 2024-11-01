import { BadRequestError, NotFoundError } from "../core/error.reponse.js"
import Product from "../model/productModel.js"

class ProductService {
    static async createProduct(product) {
        const newProduct = await Product.create({
            name: product.name,
            description: product.description,
            price: product.price
        })
        if (!newProduct) {
            throw new BadRequestError('Create new product error')
        }
        return newProduct
    }

    static async getProduct(productId) {
        const product = await Product.findOne({ _id: productId })
        if (!product) {
            throw new NotFoundError('Not found')
        }
        return product
    }


}

export default ProductService