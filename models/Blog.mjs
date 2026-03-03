import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  image: { type: String },
}, {
  timestamps: true
});

export default mongoose.model("Blog", blogSchema);
