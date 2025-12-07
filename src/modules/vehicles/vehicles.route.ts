import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middlewhere/auth";

const router = Router();

router.post("/", auth("admin"), vehiclesController.createVehicle);
router.get("/", vehiclesController.getAllVehicle);
router.get("/:id", vehiclesController.getSingleVehicle);
router.put("/:id", auth("admin"), vehiclesController.updatedVehicle);
router.delete("/:id", auth("admin"), vehiclesController.deleteVehicle);

export const vehiclesRouter = router;
