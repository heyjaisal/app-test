import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/auth.router.mjs";
import blogRoutes from "./routes/blog.router.mjs";
import uploadRoutes from "./routes/upload.router.mjs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"), "utf8")
);

const app = express();
app.use(express.json());
app.use(cors());

// Swagger Docs Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Database and Server Setup
const PORT = process.env.PORT || 5000;
const defaultMongoURI = "mongodb://127.0.0.1:27017/blog-app-test";
const MONGO_URI = process.env.MONGO_URI || defaultMongoURI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err.message);
    process.exit(1);
  });
