import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER (CREATE) */
export const register = async(req, res) => {
    try {
        // Destructures Request Parameters
        const {
            firstName, lastName, email, password,
            picturePath, location, occupation,
        } = req.body;

        // Password Hash with Salt
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Create New  User
        const newUser = new User({
            firstName, lastName, email, 
            password: passwordHash, friends: [],
            picturePath, location, occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
            twitterHandle: "", linkedInHandle: "",
        })

        // Sends back 201 response code
        await newUser.save();
        res.status(201).json({ message: "Successfully registered user!" });

    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({ message: "This email is already in use!" })
        }
        else {
            res.status(500).json({ message: err.message });
        }
    }
}

/* LOGGING IN USER (READ) */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const badMessage = "Invalid Credentials - Wrong Email or Password";

        // Finds user (email unique) and checks password
        const user = await User.findOne({ email: email });
        if (!user) { 
            return res.status(400).json({ message: badMessage }); 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { 
            return res.status(400).json({ message: badMessage }); 
        }

        // Creates a token and sends the token and user (minus password) back
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token: token, user: user });
        
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}
