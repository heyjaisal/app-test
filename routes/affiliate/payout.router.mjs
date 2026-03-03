import { Router } from "express";
import { getMyPayouts } from "../../controllers/affiliate/payout.controller.mjs";
import { verifyUserToken } from "../../middlewares/verifyToken.mjs";

const router = Router();

router.get("/", verifyUserToken, getMyPayouts);

export default router;
