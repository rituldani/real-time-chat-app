
// import jwt from "jsonwebtoken"
// import User from "../models/user.model.js"

// const secureRoute = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;
//         if(!token){
//             res.status(401).json({ error: "No token, authorization denied" });
//         }
//         const decode = jwt.verify(token, process.env.JWT_TOKEN);
//         if(!decode){
//             res.status(401).json({ error: "Invalid Token" });
//         }
//         const user = await User.findById(decode.userId).select("-password");
//         if(!user){
//             res.status(401).json({ error: "No user found" });
//         }
//         req.user = user;
//         next();
//     }
//     catch (error) {
//         console.log("Error in secureRoute:" + error)
//         res.status(500).json({ error: "Internal server error" });
//     }
// }

// export default secureRoute;


import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
    try {
        // const token = req.cookies.jwt;
        const token = req.cookies.jwt || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ error: "No token, authorization denied" });
        }

        const decode = jwt.verify(token, process.env.JWT_TOKEN);
        if (!decode) {
            return res.status(401).json({ error: "Invalid Token" });
        }

        const user = await User.findById(decode.userId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "No user found" });
        }

        req.user = user;
        next(); // Move to the next middleware or controller
    } catch (error) {
        console.log("Error in secureRoute:" + error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default secureRoute;
