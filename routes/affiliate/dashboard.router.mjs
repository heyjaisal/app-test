import express from "express";
import { getEarnings, getStats, getCurrentSlab, getMonthlyEarning } from "../../controllers/affiliate/earning.controller.mjs";
import { getOrderPerformance } from "../../controllers/affiliate/dashboard.controller.mjs";
import { verifyUserToken } from "../../middlewares/verifyToken.mjs";

const router = express.Router();

// All routes require authentication
router.use(verifyUserToken);

// Dashboard routes
router.get("/earnings", getEarnings);
router.get("/stats", getStats);
router.get("/slab", getCurrentSlab);
router.get("/performance", getOrderPerformance);
router.get("/monthly-earning", getMonthlyEarning);

export default router;

