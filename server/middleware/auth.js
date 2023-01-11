import jwt from "jsonwebtoken";

/**
 * Verifies a JSON Web Token
 */
export const verifyToken = async (req, res, next) => {
    try {
        // Gets Token and Checks It
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Access Denied");
        }
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        // Verifies the Token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}
