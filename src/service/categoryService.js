import { NotFoundError } from "../core/error.reponse.js"
import Category from "../model/categoryModel.js"

class categoryService {
    static async createCategory(category) {
        const newCategory = await Category.create({
            name: category.name,
            parentCategory: category.parentCategory
        })
        return newCategory
    }
    static async getAll() {
        const category = await Category.find({}).populate('parentCategory', 'name _id')
        if (!category) {
            throw new NotFoundError('Not found')
        }
        const categoriesWithChildren = category.map(category => {
            return {
                id: category._id,
                name: category.name,
                parentCategory: category.parentCategory ? {
                    id: category.parentCategory._id,
                    name: category.parentCategory.name
                } : null,
            };
        });
        return categoriesWithChildren
    }
    static async getCatebyparent(parentId) {
        const subcategories = await Category.find({ parentCategory: parentId });
        if (!subcategories.length) {
            throw new NotFoundError('No subcategories found for this parent category');
        }
        return subcategories.map(subcategory => ({
            id: subcategory._id,
            name: subcategory.name,
        }));
    }
    static async getParentcategory() {
        const parent = await Category.find({ parentCategory: null })
        if (!parent) {
            throw new NotFoundError('Not found')
        }
        return parent.map(parent => ({
            id: parent._id,
            name: parent.name
        }))
    }
}
export default categoryService