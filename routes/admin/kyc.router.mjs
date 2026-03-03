import { Router } from "express";
import {
    getAllPendingKyc,
    getKycById,
    approveKyc,
    rejectKyc,
} from "../../controllers/admin/kyc.controller.mjs";
import { verifyAdminToken } from "../../middlewares/verifyAdminToken.mjs";

const router = Router(); 

// Admin KYC management routes (protected with admin authentication)
router.get("/pending", verifyAdminToken, getAllPendingKyc);
router.get("/:userId", verifyAdminToken, getKycById);
router.patch("/approve/:userId", verifyAdminToken, approveKyc);
router.patch("/reject/:userId", verifyAdminToken, rejectKyc);

export default router;
