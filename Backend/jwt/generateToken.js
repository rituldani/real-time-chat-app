import jwt from "jsonwebtoken"

const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "10d",
    } );
    res.cookie("jwt", token, {
        httpOnly: true, // xss
        // secure: true,
        // secure: false, // for localhost development only
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // crsf
        maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
    });
    return token;
    // res.status(200).json({
    //     message: "User logged in successfully",
    //     user,
    //     token,
    // });
}

export default createTokenAndSaveCookie;     
