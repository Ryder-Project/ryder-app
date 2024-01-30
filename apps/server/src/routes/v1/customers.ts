import { Router } from "express";
import { registerCustomer } from "../../controllers/customerControllers";

const router = Router();

router.post("/registerCustomer", registerCustomer);

export default router;
