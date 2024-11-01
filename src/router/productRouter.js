import { Router } from "express";
import { asyncHandler } from "../middleware/asynHandler.js";
import ProductController from "../controller/productController.js";
const routerProductapi = Router();

routerProductapi.post("/product/create", asyncHandler(ProductController.createProduct));
routerProductapi.get("/product/:id", asyncHandler(ProductController.getProduct));

export default routerProductapi;