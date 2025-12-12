import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();

    } catch (error) {
        console.error("Auth Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
