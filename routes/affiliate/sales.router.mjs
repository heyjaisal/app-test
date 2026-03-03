import { Router } from "express";
import {
    getMySalesSummary,
    getMySalesHistory,
    getMonthlyDetails,
    getCommissionProjection,
} from "../../controllers/affiliate/sales.controller.mjs";
import { verifyUserToken } from "../../middlewares/verifyToken.mjs";
import { verifyKYCApproved } from "../../middlewares/verifyKYC.mjs";

const router = Router();

// All routes require authentication and KYC approval
router.use(verifyUserToken, verifyKYCApproved);

// GET /api/v1/affiliate/sales/summary - Current month summary
router.get("/summary", getMySalesSummary);

// GET /api/v1/affiliate/sales/history - Sales history
router.get("/history", getMySalesHistory);

// GET /api/v1/affiliate/sales/projection - Commission projections
router.get("/projection", getCommissionProjection);

// GET /api/v1/affiliate/sales/:year/:month - Monthly details
router.get("/:year/:month", getMonthlyDetails);

export default router;
