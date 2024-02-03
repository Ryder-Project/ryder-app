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
router.post("/login", login)
router.put("/editriderprofile/:userId", auth,  editRiderProfile);
router.get("/getRiders", getRiders);
router.post("/login", login);
router.put("/editRiderProfile/:userId", auth, editRiderProfile);
router.get("/getRiders", auth, getRiders);

export default router;