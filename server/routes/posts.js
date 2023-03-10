import express from "express";
import {
    getFeedPosts, getUserPosts,
    likePost, commentPost, deletePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);

/* DELETE */
router.delete("/:id/delete", verifyToken, deletePost);

export default router;