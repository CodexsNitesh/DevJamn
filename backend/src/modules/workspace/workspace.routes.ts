import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { createWorkspaceController, getMyWorkspacesController, getWorkspaceByIdController} from "./workspace.controller"

const router = Router();

router.post("/", protect, createWorkspaceController);
router.get("/", protect, getMyWorkspacesController)
router.get("/:workspaceId",protect, getWorkspaceByIdController);

export default router;