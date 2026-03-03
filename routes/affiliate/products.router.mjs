import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    getFeaturedProducts,
    getProductsByCategory,
} from "../../controllers/affiliate/products.controller.mjs";
import { generateAffiliateLink } from "../../controllers/affiliate/link.controller.mjs";
import { verifyUserToken } from "../../middlewares/verifyToken.mjs";
import { verifyKYCApproved } from "../../middlewares/verifyKYC.mjs";

const router = Router();

// Affiliate link generation (authenticated)
// POST /api/v1/affiliate/products/:productId/generate-link
router.post("/:productId/generate-link", verifyUserToken, verifyKYCApproved, generateAffiliateLink);
router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:id", getProductById);
router.get("/category/:category", getProductsByCategory);

export default router;
