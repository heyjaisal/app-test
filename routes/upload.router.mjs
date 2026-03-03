import { Router } from "express";
import upload from "../middlewares/upload.mjs";
import {
  uploadImage,
  uploadImages,
  uploadVideo,
} from "../utils/uploadImage.mjs";
import { deleteFileFromS3 } from "../utils/deleteFromS3.mjs";

const router = Router();

/* ---------- IMAGES ---------- */
router.post("/images", upload.array("files", 10), async (req, res) => {
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
router.post("/image", upload.single("file"), async (req, res) => {
  try {
    const url = await uploadImage(req.file);
    res.status(200).json({ url });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ---------- VIDEO ---------- */
router.post("/video", upload.single("file"), async (req, res) => {
  try {
    const url = await uploadVideo(req.file);
    res.status(200).json({ url });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ---------- DELETE ---------- */
router.delete("/delete", async (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: "Key required" });

  const result = await deleteFileFromS3(key);
  result.success
    ? res.json({ success: true })
    : res.status(500).json({ error: result.error });
});

export default router;
