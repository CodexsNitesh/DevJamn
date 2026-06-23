import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as userService from "../users/users.service";

export const updateProfileController =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    const user =
      await userService.updateProfile(
        req.user!.userId,
        req.body
      );

    res.json({
      success: true,
      user,
    });
  };

export const updateAvatarController =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    const { avatar } = req.body;

    const user =
      await userService.updateAvatar(
        req.user!.userId,
        avatar
      );

    res.json({
      success: true,
      user,
    });
  };

export const searchUsersController =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    const q =
      (req.query.q as string) || "";

    const users =
      await userService.searchUsers(q);

    res.json({
      success: true,
      users,
    });
  };