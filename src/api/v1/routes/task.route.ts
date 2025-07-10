import { Router} from "express";
const router: Router = Router();
import * as taskController from "@api/v1/controllers/tast.controller";


router.get("/", taskController.index); 
router.get(`/detail/:id`,  taskController.detail);
 router.patch(`/change-status/:id`,  taskController.changeStatus);
 router.patch(`/change-multi`,  taskController.changeMulti);
 router.post(`/create`,  taskController.create);
 router.patch(`/edit/:id`,  taskController.edit);
 router.delete(`/delete/:id`,  taskController.deleteTask);

export default router;
