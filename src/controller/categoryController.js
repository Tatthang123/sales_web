import { SuccessResponse } from "../core/success.reponse.js"
import categoryService from "../service/categoryService.js"

class categoryController {
    static async createCategory(req, res) {
        new SuccessResponse({
            message: ' create  category',
            data: await categoryService.createCategory(req.body)
        }).send(res)
    }
    static async getAll(req, res) {
        new SuccessResponse({
            message: "get all category",
            data: await categoryService.getAll()
        }).send(res)
    }
    static async getCatebyparent(req, res) {
        const id = req.params.id
        console.log(id)
        new SuccessResponse({
            message: 'get category by parent',
            data: await categoryService.getCatebyparent(id)
        }).send(res)
    }
    static async getParentcategory(req, res) {
        new SuccessResponse({
            message: 'get parentCategory',
            data: await categoryService.getParentcategory()
        }).send(res)
    }
}

export default categoryController