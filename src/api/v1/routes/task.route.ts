import { Router} from "express";
const router: Router = Router();
import * as taskController from "../controllers/tast.controller";

import * as authMiddlewares from "../middlewares/auth.middleware";


router.get("/", authMiddlewares.requireAuth,  taskController.index); 
router.get(`/detail/:id`,  authMiddlewares.requireAuth,  taskController.detail);
 router.patch(`/change-status/:id`,authMiddlewares.requireAuth,   taskController.changeStatus);
 router.patch(`/change-multi`, authMiddlewares.requireAuth,  taskController.changeMulti);
 router.post(`/create`, authMiddlewares.requireAuth,  taskController.create);
 router.patch(`/edit/:id`,authMiddlewares.requireAuth,   taskController.edit);
 router.delete(`/delete/:id`, authMiddlewares.requireAuth,  taskController.deleteTask);

export default router;
