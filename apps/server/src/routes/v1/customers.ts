import { Router } from "express";
import { customerForgotPassword, loginCustomer, registerCustomer, customerResetPassword } from "../../controllers/customerControllers";

const router = Router();

router.post("/registerCustomer", registerCustomer);
router.post("/login", loginCustomer);
router.post("/forgotPassword", customerForgotPassword);
router.post("/resetPassword", customerResetPassword);

export default router;
