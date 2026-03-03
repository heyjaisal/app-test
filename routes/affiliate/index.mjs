import { Router } from "express";
import authRouter from "./auth.router.mjs";
import productsRouter from "./products.router.mjs";
import salesRouter from "./sales.router.mjs";
import linksRouter from "./links.router.mjs";
import ordersRouter from "./orders.router.mjs";
import dashboardRouter from "./dashboard.router.mjs";
import kycRouter from "./kyc.router.mjs";
import payoutRouter from "./payout.router.mjs";

const userRouter = Router()

userRouter.use("/auth", authRouter);
userRouter.use("/products", productsRouter);
userRouter.use("/sales", salesRouter);
userRouter.use("/links", linksRouter);
userRouter.use("/orders", ordersRouter);
userRouter.use("/dashboard", dashboardRouter);
userRouter.use("/kyc", kycRouter);
userRouter.use("/payouts", payoutRouter);

export default userRouter;