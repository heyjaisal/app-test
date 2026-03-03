import { Router } from "express";
import {
    getAllCommissionSlabs,
    createCommissionSlab,
    updateCommissionSlab,
    deleteCommissionSlab,
    bulkUpdateCommissionSlabs,
} from "../../controllers/admin/commissionSlab.controller.mjs";
import { verifyAdminToken } from "../../middlewares/verifyAdminToken.mjs";

const router = Router();

router.use(verifyAdminToken);

router.get("/", getAllCommissionSlabs);

router.post("/", createCommissionSlab);

router.put("/:id", updateCommissionSlab);

router.delete("/:id", deleteCommissionSlab);

router.post("/bulk-update", bulkUpdateCommissionSlabs);

export default router;
