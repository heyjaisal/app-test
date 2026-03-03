import { Router } from "express";
import {
    submitKyc,
    getKycStatus,
    updateKyc,
} from "../../controllers/affiliate/kyc.controller.mjs";
import { verifyUserToken } from "../../middlewares/verifyToken.mjs";

const router = Router();

// KYC routes (mounted at /kyc)
router.post("/", verifyUserToken, submitKyc);
router.get("/", verifyUserToken, getKycStatus);
router.put("/", verifyUserToken, updateKyc);

export default router;
