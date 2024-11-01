
import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Tên danh mục
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null } // ID của danh mục cha
});
const Category = mongoose.model("Category", categorySchema);
export default Category