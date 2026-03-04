import Blog from "../models/Blog.mjs";

export const createBlog = async (req, res) => {
  try {
    const { title, description, tags, image, category } = req.body;
    
    if (!title || !description || !category) {
      return res.status(400).json({ message: "Title, description, and category are required" });
    }

    const blog = await Blog.create({
      user: req.user.id,
      title,
      description,
      category,
      tags: tags || [],
      image: image || "",
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to create blog", error: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    const blogs = await Blog.find(filter).populate("user", "name email").sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
  }
};

export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id }).populate("user", "name email").sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", "name email");
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog", error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const { title, description, tags, image, category } = req.body;

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.category = category || blog.category;
    blog.tags = tags || blog.tags;
    blog.image = image || blog.image;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog", error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog", error: error.message });
  }
};
