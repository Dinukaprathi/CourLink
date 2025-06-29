import express from "express";
import {getAllUsers} from "../../controllers/admin/userManagement.controller.js"
import {getTrackedUsers, deleteUser, suspendUser, unsuspendUser} from "../../controllers/admin/userTracking.controller.js"
import verifyAdminToken from "../../middleware/jwt/admin.middleware.js";

const userManagementRouter = express.Router();

userManagementRouter.get("/all", getAllUsers);
userManagementRouter.get("/track", getTrackedUsers);
userManagementRouter.delete("/:userId", deleteUser);
userManagementRouter.patch("/:userId/unsuspend", unsuspendUser);
userManagementRouter.patch("/:userId/suspend", suspendUser);

export default userManagementRouter;

