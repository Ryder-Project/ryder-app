import { Router } from "express";
import { registerRyder, getRiders } from "../../controllers/riderControllers";

const router = Router();

router.post("/registerRider", registerRyder);
router.get("/getRiders", getRiders);


export default router;
