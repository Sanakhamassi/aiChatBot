import mongoose from "mongoose";
import chatSchema from "./chat.js";
import { hash } from "bcrypt";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String, required: true, unique: true,
    },
    password: {
        type: String,
        required: true
    },
    chats: [chatSchema]
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await hash(this.password, 10);
        this.password = hashedPassword;
        next();
    }
    catch (error) {
        return next(error);
    }
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=user.js.map