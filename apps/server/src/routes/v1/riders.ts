import { Router } from "express";

import { auth } from "../../middleware/authorization";
import { upload } from "../../middleware/upload";
import {
  registerRyder,
  getRiders,
  login,
  editRiderProfile,
} from "../../controllers/riderControllers";

const router = Router();

router.post("/registerRider", registerRyder);
router.put("/editriderprofile/:userId", auth,  editRiderProfile);
router.post("/registerRider", upload.fields([
    { name: 'bikeDoc', maxCount: 1 },
    { name: 'validIdCard', maxCount: 1 },
    { name: 'passportPhoto', maxCount: 1 }
]), registerRyder);
router.post("/login", login);
router.get("/getRiders", auth, getRiders);

export default router;