import { Router } from "express";
import { getAffiliateOrders, getAffiliateReturns } from "../../controllers/affiliate/orders.controller.mjs";
import { verifyUserToken } from "../../middlewares/verifyToken.mjs";

const router = Router();

router.get("/", verifyUserToken, getAffiliateOrders);
router.get("/returns", verifyUserToken, getAffiliateReturns);

export default router;
