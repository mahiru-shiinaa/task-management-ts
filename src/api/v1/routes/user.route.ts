import { Router} from "express";
const router: Router = Router();
import * as userController from "../controllers/user.controller";

import * as authMiddlewares from "../middlewares/auth.middleware";



//router.get("/list", authMiddlewares.requireAuth, userController.list); 
router.post("/register", userController.register); 
router.post("/login", userController.login); 
//router.post("/password/forgot", userController.forgotPassword); 
//router.post("/password/otp", userController.otpPassword); 
//router.post("/password/reset", userController.resetPassword); 
router.get("/detail", authMiddlewares.requireAuth, userController.detail); 

export default router;
