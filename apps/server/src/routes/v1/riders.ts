import { Router } from "express";

import { auth } from "../../middleware/authorization";
import {
  registerRyder,
  getRiders,
  login,
  editRiderProfile,
} from "../../controllers/riderControllers";

const router = Router();

router.post("/registerRider", registerRyder);
router.put("/editriderprofile/:userId", auth,  editRiderProfile);
router.post("/login", login);
router.get("/getRiders", auth, getRiders);

export default router;