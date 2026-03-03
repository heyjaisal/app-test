import { Router } from "express";
import { handleRedirect, handleTrack } from "../controllers/public/redirect.controller.mjs";

const router = Router();

// Public redirect route - no authentication required
router.get("/:linkCode", handleRedirect);
router.get("/:linkCode/track", handleTrack);

export default router;
