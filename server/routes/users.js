import express from "express";
import { 
    getUser, getUserFriends, 
    addRemoveFriend, updateUserInformation
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * READ
 */
router.get("/:id", verifyToken, getUser);                   
router.get("/:id/friends", verifyToken, getUserFriends); 

/**
 * UPDATE
 */
router.patch("/:id/:otherId", verifyToken, addRemoveFriend);
router.patch("/:id", verifyToken, updateUserInformation);


export default router;