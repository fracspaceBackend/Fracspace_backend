import { Router } from "express";

import { registerUser,loginUser,getUserDetails,forgotPassword } from "../../Controllers/userRouters.js";

const userRouter = Router();




userRouter.post("/registration",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/profile",getUserDetails);
userRouter.put("/forgotpassword",forgotPassword);
// userRouter.put("/reset-pasword",changePassword);
// userRouter.put("/resetpassword/:resetToken",resetPassword);
// userRouter.delete("/userDelete",userDelete);

export default userRouter;