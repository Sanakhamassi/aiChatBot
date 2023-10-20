import { Router } from "express";
import { getAllUsers, signUp } from "../controllers/user-controller.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
export default userRouter;
//# sourceMappingURL=user-routes.js.map