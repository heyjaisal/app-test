import { Router } from "express";
import upload from "../middlewares/upload.mjs";
import {
  uploadImage,
  uploadImages,
  uploadVideo,
} from "../utils/uploadImage.mjs";
import { deleteFileFromS3 } from "../utils/deleteFromS3.mjs";
import { verifyUserToken } from "../middlewares/verifyToken.mjs";

const router = Router();

/* ---------- IMAGES ---------- */
// Upload multiple images
router.post("/images", verifyUserToken, upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const urls = await uploadImages(req.files);
    res.status(200).json({ urls });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ---------- SINGLE IMAGE ---------- */
// Upload single image
router.post("/image", verifyUserToken, upload.single("file"), async (req, res) => {
  try {
    const url = await uploadImage(req.file);
    res.status(200).json({ url });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ---------- DELETE ---------- */
router.delete("/delete", verifyUserToken, async (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: "Key required" });

  const result = await deleteFileFromS3(key);
  result.success
    ? res.json({ success: true })
    : res.status(500).json({ error: result.error });
});

export default router;
