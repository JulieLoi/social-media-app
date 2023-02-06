import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import advertisementRoutes from "./routes/advertisements.js"

// Controller Functions (Middleware, Upload IMage)
import { verifyToken } from "./middleware/auth.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { createAd } from "./controllers/advertisements.js";
import { updateProfileImage } from "./controllers/users.js";

/*
 * Configurations
 */
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const app = express();                                          
app.use(express.json());                                                    // Backend Framework
app.use(helmet());                                                          // HTTP Header Security
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));                                                  // Logs HTTP Requests and Errors (Standard Apache common log output)
app.use(bodyParser.json({ limit: "30mb", extended: true }));                // application/json parser
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));          // application/x-www-form-urlencoded parser
app.use(cors());                                                            // Enable All CORS Requests
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/**
 * File Storage Configurations
 * Stores image based on whether it is for a user profile image, 
 * a post image, or an advertisement image
 */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const { serverPath } = req.body ? req.body : "";
        cb(null, `public/assets` + serverPath);
    },
    filename: function(req, file, cb) {
        const { picturePath } = req.body;
        cb(null, picturePath);
    }
});
const upload = multer({ storage });

/**
 * Routes with File 
 * Routes that needs to upload an image to the server for storage
 */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("attachment"), createPost);
app.post("/advertisements", verifyToken, upload.single("picture"), createAd);
app.patch("/users/:id", verifyToken, upload.single("picture"), updateProfileImage);

// Routes (no file upload)
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/advertisements", advertisementRoutes);
// Show text for server running
app.get("/", (req, res) => {
    res.send("Server Test!");
});

export default app;

/*
const express = require("express");
const cors = require("cors");


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", ActivityRouter);

app.use("/api/auth", AuthRouter);

module.exports = app;
*/