import jwt from "jsonwebtoken"

const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "10d",
    } );
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ✅ true on Vercel
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ allow cross-origin
        maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    return token;
    // res.status(200).json({
    //     message: "User logged in successfully",
    //     user,
    //     token,
    // });
}

export default createTokenAndSaveCookie;     
