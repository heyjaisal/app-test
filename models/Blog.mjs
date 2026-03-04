import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["Tech", "Lifestyle", "Food", "Travel", "Health", "Business", "Fashion", "Education","Others"],
    default: "Others"
  },
  tags: [{ type: String }],
  image: { type: String },
}, {
  timestamps: true
});

export default mongoose.model("Blog", blogSchema);
