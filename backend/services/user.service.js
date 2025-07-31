import User from "../models/user.model.js";
import {
  validateUserUpdate,
  validateUserExists,
} from "../errors/UserValidationError.js";
import logger from "../utils/logger.js";

export const getAllUsers = async () => {
  logger.info("Fetching all users");
  return await User.findAll();
};

export const getUserById = async (id) => {
  logger.info(`Fetching user by ID: ${id}`);
  const user = await User.findByPk(id);
  validateUserExists(user);
  return user;
};

export const updateUser = async (id, dto, isAdmin = false) => {
  logger.info(`Updating user ${id} with data: ${JSON.stringify(dto)}`);

  const user = await User.findByPk(id);
  validateUserExists(user);

  const validatedData = validateUserUpdate(dto);

  user.name = validatedData.name ?? user.name;
  user.mobile_number = validatedData.mobile_number ?? user.mobile_number;
  user.address = validatedData.address ?? user.address;

  if (isAdmin) {
    if (validatedData.role) user.role = validatedData.role;
    if (validatedData.isActive !== undefined)
      user.isActive = validatedData.isActive;
  }

  await user.save();
  logger.info(`User updated successfully: ${id}`);

  return user;
};

export const deleteUser = async (id) => {
  logger.info(`Deleting user with ID: ${id}`);

  const user = await User.findByPk(id);
  validateUserExists(user);

  await user.destroy();
  logger.info(`User deleted successfully: ${id}`);

  return { message: "User deleted successfully" };
};
