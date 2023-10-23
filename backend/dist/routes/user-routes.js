import { Router } from "express";
import { getAllUsers, signUp, login } from "../controllers/user-controller.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), signUp);
userRouter.post("/login", validate(loginValidator), login);
export default userRouter;
//use middleware to validate inputs
//# sourceMappingURL=user-routes.js.map