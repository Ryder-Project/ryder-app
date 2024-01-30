import { Router } from "express";
import { registerRyder } from "../../controllers/riderControllers";

const router = Router();

router.post("/registerRider", registerRyder);



export default router;
