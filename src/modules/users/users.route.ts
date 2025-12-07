import { Router } from "express";
import { controllerUsers } from "./users.controller";
import auth from "../../middlewhere/auth";

const router = Router();

router.get("/", auth("admin"), controllerUsers.getAllUser);
router.put("/:id", auth("admin", "customer"), controllerUsers.updatedUser);
router.delete("/:id", auth("admin"), controllerUsers.deleteUser);

export const userRouter = router;
