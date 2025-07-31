import { describe, it, expect, beforeEach, vi } from "vitest";
import * as userService from "../../services/user.service.js";
import User from "../../models/user.model.js";

describe("User Service - Users CRUD operations", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch all users", async () => {
    const fakeUsers = [
      { user_id: 1, name: "Alice" },
      { user_id: 2, name: "Bob" },
    ];
    vi.spyOn(User, "findAll").mockResolvedValue(fakeUsers);
    const result = await userService.getAllUsers();
    expect(result).toEqual(fakeUsers);
    expect(User.findAll).toHaveBeenCalledTimes(1);
  });

  it("should fetch user by ID", async () => {
    const fakeUser = { user_id: 1, name: "Alice" };
    vi.spyOn(User, "findByPk").mockResolvedValue(fakeUser);
    const result = await userService.getUserById(1);
    expect(result).toEqual(fakeUser);
    expect(User.findByPk).toHaveBeenCalledWith(1);
  });

  it("should throw if user by ID does not exist", async () => {
    vi.spyOn(User, "findByPk").mockResolvedValue(null);
    await expect(userService.getUserById(999)).rejects.toThrow(
      "User not found"
    );
  });

  it("should update user fields (non-admin)", async () => {
    const fakeUser = {
      user_id: 1,
      name: "Alice",
      mobile_number: "123",
      address: "Old",
      save: vi.fn().mockResolvedValue(),
    };
    vi.spyOn(User, "findByPk").mockResolvedValue(fakeUser);

    const result = await userService.updateUser(1, {
      name: "Bob",
      mobile_number: "456",
      address: "New",
    });

    expect(result.name).toBe("Bob");
    expect(result.mobile_number).toBe("456");
    expect(result.address).toBe("New");
    expect(fakeUser.save).toHaveBeenCalledTimes(1);
  });

  it("should update user fields (admin)", async () => {
    const fakeUser = {
      user_id: 1,
      name: "Alice",
      mobile_number: "123",
      address: "Old",
      role: "user",
      isActive: true,
      save: vi.fn().mockResolvedValue(),
    };
    vi.spyOn(User, "findByPk").mockResolvedValue(fakeUser);

    const result = await userService.updateUser(
      1,
      {
        name: "Bob",
        mobile_number: "456",
        address: "New",
        role: "admin",
        isActive: false,
      },
      true
    );

    expect(result.name).toBe("Bob");
    expect(result.mobile_number).toBe("456");
    expect(result.address).toBe("New");
    expect(result.role).toBe("admin");
    expect(result.isActive).toBe(false);
    expect(fakeUser.save).toHaveBeenCalledTimes(1);
  });

  it("should throw if updateUser is called with invalid user", async () => {
    vi.spyOn(User, "findByPk").mockResolvedValue(null);
    await expect(userService.updateUser(999, {})).rejects.toThrow(
      "User not found"
    );
  });

  it("should delete user", async () => {
    const fakeUser = {
      user_id: 1,
      destroy: vi.fn().mockResolvedValue(),
    };
    vi.spyOn(User, "findByPk").mockResolvedValue(fakeUser);
    const result = await userService.deleteUser(1);
    expect(fakeUser.destroy).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ message: "User deleted successfully" });
  });

  it("should throw if user to delete does not exist", async () => {
    vi.spyOn(User, "findByPk").mockResolvedValue(null);
    await expect(userService.deleteUser(999)).rejects.toThrow("User not found");
  });
});
