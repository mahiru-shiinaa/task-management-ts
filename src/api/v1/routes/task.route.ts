import { Router} from "express";
const router: Router = Router();
import * as taskController from "@controllers/tastController";


router.get("/", taskController.index); 
router.get(`/detail/:id`,  taskController.detail);
 router.patch(`/change-status/:id`,  taskController.changeStatus);
 router.patch(`/change-multi`,  taskController.changeMulti);
// router.post(`/create`,  taskController.create);
// router.patch(`/edit/:id`,  taskController.edit);
// router.delete(`/delete/:id`,  taskController.delete);

export default router;
