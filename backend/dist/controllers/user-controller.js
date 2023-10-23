import User from "../models/user.js";
import { compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { cookieName } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    //get all users 
    try {
        const users = await User.find();
        return res.status(200).json({
            message: "ok",
            users
        });
    }
    catch (error) {
        console.log("problrm0", error);
        return res.status(400).json({
            message: "error"
        });
    }
};
export const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const exitUser = await User.findOne({ email });
        if (exitUser) {
            return res.status(401).json({
                message: "user already exists with this mail",
            });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        // create token and store cookie 
        res.clearCookie(cookieName, { httpOnly: true, domain: "localhost", signed: true, path: "/" });
        const token = createToken(newUser.id.toString(), newUser.email, "7d");
        //sendthe token via cookie http
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(cookieName, token, {
            path: "/", domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(201).json({
            message: "ok",
            newUser
        });
    }
    catch (error) {
        console.log("problrm", error);
        return res.json({
            message: "error",
            cause: error
        });
    }
};
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "no user with this mail",
            });
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (isPasswordCorrect == false) {
            return res.status(403).json({
                message: "Incorrect passwords",
            });
        }
        res.clearCookie(cookieName, { httpOnly: true, domain: "localhost", signed: true, path: "/" });
        const token = createToken(user.id.toString(), user.email, "7d");
        //sendthe token via cookie http
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(cookieName, token, {
            path: "/", domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        return res.status(201).json({
            message: "ok",
            userId: user.id,
            token: token
        });
    }
    catch (error) {
        console.log("problrm", error);
        return res.json({
            message: "error",
            cause: error
        });
    }
};
//# sourceMappingURL=user-controller.js.map