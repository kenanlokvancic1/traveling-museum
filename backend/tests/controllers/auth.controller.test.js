import { describe, it, expect, vi, beforeEach } from "vitest";
import * as authController from "../../controllers/auth.controller.js";
import * as authService from "../../services/auth.service.js";
import logger from "../../utils/logger.js";

describe("auth.controller (unit tests)", () => {
  let req, res, next;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(logger, "info").mockImplementation(() => {});
    req = {
      body: {},
      params: {},
      user: { id: 1, email: "a@b.com" },
      cookies: {},
    };
    res = {
      json: vi.fn(),
      status: vi.fn(() => res),
      clearCookie: vi.fn(() => res),
      cookie: vi.fn(() => res),
    };
    next = vi.fn();
  });

  it("should register user and return result (201)", async () => {
    const fakeResult = { user: { email: "a@b.com" }, token: "token123" };
    vi.spyOn(authService, "registerUserService").mockResolvedValue(fakeResult);
    req.body = {
      name: "A",
      email: "a@b.com",
      password: "pass123",
      role: "user",
    };

    await authController.register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(authService.registerUserService).toHaveBeenCalled();
  });

  it("should login user, set cookie, and return token/user (200)", async () => {
    const fakeResult = { token: "token123", user: { email: "a@b.com" } };
    vi.spyOn(authService, "loginUserService").mockResolvedValue(fakeResult);
    req.body = { email: "a@b.com", password: "pass" };

    await authController.login(req, res, next);
    
    expect(res.cookie).toHaveBeenCalledWith(
      "token",
      "token123",
      expect.objectContaining({ httpOnly: true })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(authService.loginUserService).toHaveBeenCalled();
  });

  it("should clear cookie and return logout message (200)", async () => {
    const fakeResult = { message: "Successfully logged out" };
    vi.spyOn(authService, "logoutUserService").mockResolvedValue(fakeResult);

    await authController.logout(req, res, next);

    expect(res.clearCookie).toHaveBeenCalledWith("token");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(authService.logoutUserService).toHaveBeenCalled();
  });

  it("should send verification code and return result (200)", async () => {
    const fakeResult = { message: "Verification code sent" };
    vi.spyOn(authService, "sendVerificationCodeService").mockResolvedValue(
      fakeResult
    );
    req.body = { email: "a@b.com" };

    await authController.sendVerificationCode(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(authService.sendVerificationCodeService).toHaveBeenCalledWith(
      "a@b.com"
    );
  });

  it("should verify code and return result (200)", async () => {
    const fakeResult = { message: "User verified successfully", success: true };
    vi.spyOn(authService, "verifyCodeService").mockResolvedValue(fakeResult);
    req.body = { email: "a@b.com", code: "123456" };

    await authController.verifyCode(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(authService.verifyCodeService).toHaveBeenCalledWith({
      email: "a@b.com",
      code: "123456",
    });
  });

  it("should change password, clear cookie, and return result (200)", async () => {
    const fakeResult = {
      message: "Password changed successfully. You have been logged out.",
    };
    vi.spyOn(authService, "changePasswordService").mockResolvedValue(
      fakeResult
    );
    req.body = {
      currentPassword: "oldpass123",
      newPassword: "newpass123",
      confirmPassword: "newpass123",
    };
    req.user = { id: 1 };

    await authController.changePassword(req, res, next);

    expect(res.clearCookie).toHaveBeenCalledWith("token");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(authService.changePasswordService).toHaveBeenCalled();
  });

  it("should send forgot password email and return result (200)", async () => {
    const fakeResult = { message: "Reset link sent to email" };
    vi.spyOn(authService, "forgotPasswordService").mockResolvedValue(
      fakeResult
    );
    req.body = { email: "a@b.com" };

    await authController.forgotPassword(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(authService.forgotPasswordService).toHaveBeenCalledWith({
      email: "a@b.com",
    });
  });

  it("should reset password and return result (200)", async () => {
    const fakeResult = { message: "Password updated successfully" };
    vi.spyOn(authService, "resetPasswordService").mockResolvedValue(fakeResult);
    req.params = { token: "reset123" };
    req.body = { newPassword: "new", confirmPassword: "new" };

    await authController.resetPassword(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(authService.resetPasswordService).toHaveBeenCalledWith({
      token: "reset123",
      newPassword: "new",
      confirmPassword: "new",
    });
  });

  it("should verify password and return result (200)", async () => {
    const fakeResult = { message: "Password verified successfully." };
    vi.spyOn(authService, "verifyPasswordService").mockResolvedValue(
      fakeResult
    );
    req.user = { id: 1 };
    req.body = { password: "plain" };

    await authController.verifyPassword(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeResult);
    expect(authService.verifyPasswordService).toHaveBeenCalled();
  });
});
