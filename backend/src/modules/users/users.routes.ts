import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { updateProfileController } from "../users/users.controller";

const router = Router();

router.patch("/me", protect, updateProfileController);

export default router;