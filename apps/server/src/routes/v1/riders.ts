import { Router } from "express";
import {editRiderProfile } from "../../controllers/riderControllers/editRiderProfile"
import { auth } from "../../middleware/authorization";
import { registerRyder, getRiders, login } from "../../controllers/riderControllers";

const router = Router();

router.post("/registerRider", registerRyder);
router.post("/login", login)
router.put("/editriderprofile/:userId", auth,  editRiderProfile);
router.get("/getRiders", getRiders);

export default router;