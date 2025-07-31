import * as userService from "../services/user.service.js";
import { UserResponseDTO } from "../dto/user/responses/UserResponseDTO.js";
import {
  UserUpdateRequestDTO,
  AdminUpdateUserDTO,
} from "../dto/user/requests/UserRequestDTO.js";
import errorHandler from "../middleware/errorHandler.js";
import { NotFoundError, ForbiddenError } from "../errors/AppError.js";
import logger from "../utils/logger.js";

export const getAllUsers = errorHandler(async (req, res) => {
  logger.info("Get all users request received", { user: req.user.id });
  if (req.user.role !== "admin") {
    logger.warn("Forbidden: non-admin tried to access all users", {
      user: req.user.id,
    });
    throw new ForbiddenError("Only admins can access this resource");
  }
  const users = await userService.getAllUsers();
  logger.info("All users retrieved", { count: users.length });
  res.json(users.map((user) => new UserResponseDTO(user)));
});

export const getMyProfile = errorHandler(async (req, res) => {
  logger.info("Get my profile request received", { user: req.user.id });
  const user = await userService.getUserById(req.user.id);
  if (!user) {
    logger.warn("User not found for profile", { user: req.user.id });
    throw new NotFoundError("User not found");
  }
  logger.info("User profile retrieved", { user: req.user.id });
  res.json(new UserResponseDTO(user));
});

export const getUserById = errorHandler(async (req, res) => {
  logger.info("Get user by ID request received", {
    requestedId: req.params.id,
    user: req.user.id,
  });
  if (req.user.role !== "admin") {
    logger.warn("Forbidden: non-admin tried to access user by ID", {
      user: req.user.id,
    });
    throw new ForbiddenError("Only admins can access this resource");
  }
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    logger.warn("User not found", { requestedId: req.params.id });
    throw new NotFoundError("User not found");
  }
  logger.info("User retrieved by ID", { requestedId: req.params.id });
  res.json(new UserResponseDTO(user));
});

export const updateMyProfile = errorHandler(async (req, res) => {
  logger.info("Update my profile request received", {
    user: req.user.id,
    body: req.body,
  });
  const dto = new UserUpdateRequestDTO(req.body);
  const updated = await userService.updateUser(req.user.id, dto);
  logger.info("User profile updated", { user: req.user.id });
  res.json(new UserResponseDTO(updated));
});

export const updateUserByAdmin = errorHandler(async (req, res) => {
  logger.info("Admin update user request received", {
    admin: req.user.id,
    targetUser: req.params.id,
    body: req.body,
  });
  if (req.user.role !== "admin") {
    logger.warn("Forbidden: non-admin tried to update user", {
      user: req.user.id,
    });
    throw new ForbiddenError("Only admins can access this resource");
  }
  const dto = new AdminUpdateUserDTO(req.body);
  const updated = await userService.updateUser(req.params.id, dto, true);
  logger.info("User updated by admin", {
    admin: req.user.id,
    targetUser: req.params.id,
  });
  res.json(new UserResponseDTO(updated));
});

export const deleteMyAccount = errorHandler(async (req, res) => {
  logger.info("Delete my account request received", { user: req.user.id });
  const deleted = await userService.deleteUser(req.user.id);
  logger.info("User account deleted", { user: req.user.id });
  res.clearCookie("token");
  res.status(200).json(deleted);
});

export const deleteUserByAdmin = errorHandler(async (req, res) => {
  logger.info("Admin delete user request received", {
    admin: req.user.id,
    targetUser: req.params.id,
  });
  if (req.user.role !== "admin") {
    logger.warn("Forbidden: non-admin tried to delete user", {
      user: req.user.id,
    });
    throw new ForbiddenError("Only admins can access this resource");
  }
  const deleted = await userService.deleteUser(req.params.id);
  logger.info("User deleted by admin", {
    admin: req.user.id,
    targetUser: req.params.id,
  });
  res.status(200).json(deleted);
});
