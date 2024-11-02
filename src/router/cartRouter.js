import { Router } from "express";
import { asyncHandler } from "../middleware/asynHandler.js";
import CartController from "../controller/cartController.js";

const routerCartapi = Router();

routerCartapi.post("/cart/create", asyncHandler(CartController.addProductCart));
routerCartapi.get("/cart", asyncHandler(CartController.getItemCart));
routerCartapi.put('/cart/update', asyncHandler(CartController))
routerCartapi.delete('/cart/remove/:id', asyncHandler(CartController.removeItems))
export default routerCartapi