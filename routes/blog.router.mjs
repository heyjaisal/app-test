import { Router } from "express";
import { createBlog, getBlogs, getMyBlogs, updateBlog, deleteBlog } from "../controllers/blog.controller.mjs";
import protect from "../middlewares/auth.mjs";

const router = Router();

router.route("/")
  .get(getBlogs)
  .post(protect, createBlog);

router.get("/my", protect, getMyBlogs);

router.route("/:id")
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;
