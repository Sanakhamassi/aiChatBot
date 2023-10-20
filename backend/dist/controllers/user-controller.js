import User from "../models/user.js";
import { hash } from "bcrypt";
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
        const hashedPassword = hash(password, 10);
        const newUser = new User({ name, email, hashedPassword });
        await newUser.save();
        return res.status(200).json({
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
//# sourceMappingURL=user-controller.js.map