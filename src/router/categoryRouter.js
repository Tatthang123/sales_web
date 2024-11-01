import { Router } from "express";
import { asyncHandler } from "../middleware/asynHandler.js";
import categoryController from "../controller/categoryController.js";
const routerCategoryapi = Router();

routerCategoryapi.post("/category/create", asyncHandler(categoryController.createCategory));
routerCategoryapi.get("/category/parent/:id", asyncHandler(categoryController.getCatebyparent));
routerCategoryapi.get("/category", asyncHandler(categoryController.getAll));
routerCategoryapi.get("/category/parent", asyncHandler(categoryController.getParentcategory));
export default routerCategoryapi;