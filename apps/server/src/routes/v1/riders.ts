import { Router } from "express";
import { registerRider } from "../../controllers/riderControllers";

const router = Router();

router.post("/registerRider", registerRider);

export default router;
