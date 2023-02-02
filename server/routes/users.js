import express from "express";
import { 
    getUser, getUserFriends, 
    addRemoveFriend, updateUserInformation, getAllUsers
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getAllUsers);
router.get("/:id", getUser);                   
router.get("/:id/friends", getUserFriends); 

/* UPDATE*/
router.patch("/:id/:otherId", verifyToken, addRemoveFriend);
router.patch("/:id", verifyToken, updateUserInformation);


export default router;