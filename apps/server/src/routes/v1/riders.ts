import { Router } from "express";
import {editProfile } from "../../controllers/riderControllers/editProfileSettings"
import { auth } from "../../middleware/authorization";
import { registerRyder, getRiders, login } from "../../controllers/riderControllers";

const router = Router();

router.post("/registerRider", registerRyder);
router.post("/login", login)
router.put("/editprofile/:userId",  auth, editProfile);
router.get("/getRiders", getRiders);

export default router;