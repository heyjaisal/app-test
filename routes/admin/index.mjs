import { Router } from "express";
import kycRouter from "./kyc.router.mjs";
import commissionSlabsRouter from "./commissionSlabs.router.mjs";

const userRouter = Router()

userRouter.use("/kyc", kycRouter);
userRouter.use("/commission-slabs", commissionSlabsRouter);

export default userRouter;