import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import connectDB from './config/database.js';
import authMiddleware from './middleware/authMiddleware.js'
import routerAuthapi from './router/authRouter.js';
import routerUserapi from './router/userRouter.js';
import routerProductapi from './router/productRouter.js';
import routerCategoryapi from './router/categoryRouter.js';
const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
connectDB();
//config middleware
app.use(authMiddleware)

//router
app.use("/api/v1", routerAuthapi)
app.use("/api/v1", routerUserapi)
app.use("/api/v1", routerProductapi)
app.use("/api/v1", routerCategoryapi)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
