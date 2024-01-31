import { Router } from "express";
import { registerRyder } from "../../controllers/riderControllers";
import {editProfile } from "../../controllers/riderControllers/editProfileSettings"
import { auth } from "../../middleware/authorization";

const router = Router();

router.post("/registerRider", registerRyder);
router.put("/editprofile/:userId",  auth, editProfile);



export default router;
