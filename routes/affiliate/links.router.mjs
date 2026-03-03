import { Router } from "express";
import { getMyLinks, getAffiliateStats } from "../../controllers/affiliate/link.controller.mjs";
import { verifyUserToken } from "../../middlewares/verifyToken.mjs";

const router = Router();

// Get all links for the authenticated affiliate
// GET /api/v1/affiliate/links
router.get("/", verifyUserToken, getMyLinks);

// Get affiliate dashboard stats
// GET /api/v1/affiliate/links/stats
router.get("/stats", verifyUserToken, getAffiliateStats);

export default router;
