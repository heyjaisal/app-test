import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3Client.mjs";

const IMAGE_FOLDER = "images/";
const VIDEO_FOLDER = "videos/";

const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_MIME_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

/* ---------- IMAGE UPLOAD (WEBP + OPTIMIZED) ---------- */
export async function uploadImage(file) {
  if (!file) throw new Error("No image file provided");

  if (!IMAGE_MIME_TYPES.includes(file.mimetype)) {
    throw new Error("Unsupported image format");
  }

  const fileName = `${IMAGE_FOLDER}${uuidv4()}.webp`;

  const optimizedBuffer = await sharp(file.buffer)
    .rotate()                 
    .resize({ width: 1600 })  
    .webp({ quality: 70 })  
    .toBuffer();           

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: optimizedBuffer,
    ContentType: "image/webp",
  });

  await s3Client.send(command);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}

/* ---------- MULTIPLE IMAGES ---------- */
export async function uploadImages(files = []) {
  return Promise.all(files.map(uploadImage));
}

/* ---------- VIDEO UPLOAD (NO PROCESSING) ---------- */
export async function uploadVideo(file) {
  if (!file) throw new Error("No video file provided");

  if (!VIDEO_MIME_TYPES.includes(file.mimetype)) {
    throw new Error("Unsupported video format");
  }

  const extension = file.mimetype.split("/")[1];
  const fileName = `${VIDEO_FOLDER}${uuidv4()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}
