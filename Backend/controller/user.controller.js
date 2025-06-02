import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import createTokenAndSaveCookie from "../jwt/generateToken.js"

export const signup = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    // console.log("fatch data");

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password do not match" });
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ error: "User already exist" });
        }
        // hashing the password
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await new User({
            fullname: username,
            email,
            password: hashPassword,
        });
        await newUser.save();
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res);
            return res.status(200).json({
                message: "Registered Successfully", newUser: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email
                }
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and Password are required." });
    }
    // console.log(password)
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid User Credential" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid User Credential" });
        }
        const token = createTokenAndSaveCookie(user._id, res);
        res.status(200).json({
            message: "User logged in sucessfully", user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                // password: user.password
            },
            token: token,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(201).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const allUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(201).json(
            filteredUser
        );
    }
    catch (error) {
        console.log("Error in allUsers Controller: " + error)
    }
}