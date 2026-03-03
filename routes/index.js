import { Router } from "express";
import affiliateRouter from "./affiliate/index.mjs";
import adminRouter from "./admin/index.mjs";
import uploadRouter from "./upload.routes.mjs";
import redirectRouter from "./redirect.router.mjs";

const router = Router()

router.use("/api/v1/affiliate", affiliateRouter);
router.use("/api/v1/admin", adminRouter);
router.use("/api/v1/upload", uploadRouter);
router.use("/api/v1/product/:productSlug/r", redirectRouter);  // Updated: Added /product/ to the path
router.use("/api/v1/r", redirectRouter);               // Keep old legacy route

export default router;