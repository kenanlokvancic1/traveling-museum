import { describe, it, expect, vi, beforeEach } from "vitest";
import * as userService from "../../services/user.service.js";
import * as userController from "../../controllers/user.controller.js";
import { UserResponseDTO } from "../../dto/user/responses/UserResponseDTO.js";

describe("user.controller (unit tests)", () => {
  let req, res, next;

  beforeEach(() => {
    vi.restoreAllMocks();
    req = {
      user: { id: 1, role: "admin" },
      params: {},
      body: {},
    };
    res = {
      json: vi.fn(),
      status: vi.fn(() => res),
      clearCookie: vi.fn(() => res),
    };
    next = vi.fn();
  });

  it("should return all users for admin (requires: admin user)", async () => {
    const fakeUsers = [{ user_id: 1 }, { user_id: 2 }];
    vi.spyOn(userService, "getAllUsers").mockResolvedValue(fakeUsers);
    await userController.getAllUsers(req, res, next);
    expect(res.json).toHaveBeenCalledWith(
      fakeUsers.map((u) => new UserResponseDTO(u))
    );
  });

  it("should return 403 for non-admin (requires: user role)", async () => {
    req.user.role = "user";
    await userController.getAllUsers(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: expect.any(String),
    });
  });

  it("should return user profile if found (requires: user exists)", async () => {
    const fakeUser = { user_id: 1 };
    vi.spyOn(userService, "getUserById").mockResolvedValue(fakeUser);
    await userController.getMyProfile(req, res, next);
    expect(res.json).toHaveBeenCalledWith(new UserResponseDTO(fakeUser));
  });

  it("should return 404 if user not found (requires: user missing)", async () => {
    vi.spyOn(userService, "getUserById").mockResolvedValue(null);
    await userController.getMyProfile(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: expect.any(String),
    });
  });

  it("should return user for admin (requires: admin user)", async () => {
    req.params.id = 2;
    const fakeUser = { user_id: 2 };
    vi.spyOn(userService, "getUserById").mockResolvedValue(fakeUser);
    await userController.getUserById(req, res, next);
    expect(res.json).toHaveBeenCalledWith(new UserResponseDTO(fakeUser));
  });

  it("should return 403 for non-admin (requires: user role)", async () => {
    req.user.role = "user";
    req.params.id = 2;
    await userController.getUserById(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: expect.any(String),
    });
  });

  it("should return 404 if user not found (requires: admin user, user missing)", async () => {
    req.params.id = 2;
    vi.spyOn(userService, "getUserById").mockResolvedValue(null);
    await userController.getUserById(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: expect.any(String),
    });
  });

  it("should update and return user profile (requires: valid update)", async () => {
    const updatedUser = { user_id: 1, name: "Updated" };
    vi.spyOn(userService, "updateUser").mockResolvedValue(updatedUser);
    await userController.updateMyProfile(req, res, next);
    expect(res.json).toHaveBeenCalledWith(new UserResponseDTO(updatedUser));
  });

  it("should update user if admin (requires: admin user)", async () => {
    req.params.id = 2;
    const updatedUser = { user_id: 2, name: "Updated" };
    vi.spyOn(userService, "updateUser").mockResolvedValue(updatedUser);
    await userController.updateUserByAdmin(req, res, next);
    expect(res.json).toHaveBeenCalledWith(new UserResponseDTO(updatedUser));
  });

  it("should return 403 for non-admin (requires: user role)", async () => {
    req.user.role = "user";
    req.params.id = 2;
    await userController.updateUserByAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: expect.any(String),
    });
  });

  it("should delete user and clear cookie (requires: valid user)", async () => {
    const deleted = { message: "User deleted successfully" };
    vi.spyOn(userService, "deleteUser").mockResolvedValue(deleted);
    await userController.deleteMyAccount(req, res, next);
    expect(res.clearCookie).toHaveBeenCalledWith("token");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(deleted);
  });

  it("should delete user if admin (requires: admin user)", async () => {
    req.params.id = 2;
    const deleted = { message: "User deleted successfully" };
    vi.spyOn(userService, "deleteUser").mockResolvedValue(deleted);
    await userController.deleteUserByAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(deleted);
  });

  it("should return 403 for non-admin (requires: user role)", async () => {
    req.user.role = "user";
    req.params.id = 2;
    await userController.deleteUserByAdmin(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: expect.any(String),
    });
  });
});
