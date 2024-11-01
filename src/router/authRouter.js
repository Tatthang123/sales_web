import { Router } from "express";
import { asyncHandler } from "../middleware/asynHandler.js";
import AuthController from "../controller/authController.js";
const routerAuthapi = Router();

routerAuthapi.post("/auth/login", asyncHandler(AuthController.login));

export default routerAuthapi;