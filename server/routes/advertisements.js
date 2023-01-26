import express from "express";
import { getAds } from "../controllers/advertisements.js";

const router = express.Router();

/* READ */
router.get("/", getAds);

export default router;
