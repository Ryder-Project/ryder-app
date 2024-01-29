import { Router } from "express";
import { registerRyder } from "../../controllers/riderControllers";
import { getRiders } from "../../controllers/riderControllers/getRiderDetails";

const router = Router();

router.post("/registerRider", registerRyder);
router.get("/getRiders", getRiders);


export default router;
