import { describe, it, expect, beforeEach, vi } from "vitest";
import * as authService from "../../services/auth.service.js";
import User from "../../models/user.model.js";
import UserVerification from "../../models/userVerification.model.js";
import PasswordResetToken from "../../models/passwordResendTokens.model.js";
import * as mailService from "../../services/mail.service.js";
import bcrypt from "bcryptjs";
import * as tokenUtils from "../../utils/generateToken.js";
import * as codeUtils from "../../utils/generateVerificationCode.js";
import * as resetTokenUtils from "../../utils/generateResetToken.js";

describe("Auth Service - Unit Tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("registerUserService: should register new user and send verification code", async () => {
    vi.spyOn(User, "findOne").mockResolvedValue(null);
    vi.spyOn(User, "create").mockResolvedValue({
      user_id: 1,
      email: "a@b.com",
      name: "A",
      role: "user",
    });
    vi.spyOn(tokenUtils, "default").mockReturnValue("token123");
    vi.spyOn(codeUtils, "default").mockReturnValue("123456");
    vi.spyOn(UserVerification, "create").mockResolvedValue({});
    vi.spyOn(mailService, "sendVerificationCode").mockResolvedValue();

    const dto = { name: "A", email: "a@b.com", password: "pass", role: "user" };
    const result = await authService.registerUserService(dto);

    expect(result).toHaveProperty("token", "token123");
    expect(result).toHaveProperty("user");
    expect(User.create).toHaveBeenCalled();
    expect(UserVerification.create).toHaveBeenCalled();
    expect(mailService.sendVerificationCode).toHaveBeenCalledWith(
      "a@b.com",
      "123456"
    );
  });

  it("registerUserService: should throw if user already exists", async () => {
    vi.spyOn(User, "findOne").mockResolvedValue({ user_id: 1 });
    const dto = { name: "A", email: "a@b.com", password: "pass", role: "user" };
    await expect(authService.registerUserService(dto)).rejects.toThrow();
  });

  it("loginUserService: should login user and return token", async () => {
    const fakeUser = {
      user_id: 1,
      email: "a@b.com",
      password: "hashed",
      isActive: true,
    };
    vi.spyOn(User, "findOne").mockResolvedValue(fakeUser);
    vi.spyOn(bcrypt, "compare").mockResolvedValue(true);
    vi.spyOn(tokenUtils, "default").mockReturnValue("token123");

    const dto = { email: "a@b.com", password: "pass" };
    const result = await authService.loginUserService(dto);

    expect(result).toHaveProperty("token", "token123");
    expect(result).toHaveProperty("user", fakeUser);
  });

  it("loginUserService: should throw if user not found", async () => {
    vi.spyOn(User, "findOne").mockResolvedValue(null);
    await expect(
      authService.loginUserService({ email: "x", password: "y" })
    ).rejects.toThrow();
  });

  it("loginUserService: should throw if user not active", async () => {
    vi.spyOn(User, "findOne").mockResolvedValue({ isActive: false });
    await expect(
      authService.loginUserService({ email: "x", password: "y" })
    ).rejects.toThrow();
  });

  it("loginUserService: should throw if password does not match", async () => {
    vi.spyOn(User, "findOne").mockResolvedValue({
      isActive: true,
      password: "hashed",
    });
    vi.spyOn(bcrypt, "compare").mockResolvedValue(false);
    await expect(
      authService.loginUserService({ email: "x", password: "y" })
    ).rejects.toThrow();
  });

  it("logoutUserService: should return logout message", async () => {
    const result = await authService.logoutUserService();
    expect(result).toEqual({ message: "Successfully logged out" });
  });

  it("sendVerificationCodeService: should send code if user and verification exist", async () => {
    const fakeUser = { user_id: 1, email: "a@b.com" };
    const fakeVerification = {
      resendAttempts: 1,
      update: vi.fn().mockResolvedValue(),
    };
    vi.spyOn(User, "findOne").mockResolvedValue(fakeUser);
    vi.spyOn(UserVerification, "findOne").mockResolvedValue(fakeVerification);
    vi.spyOn(codeUtils, "default").mockReturnValue("654321");
    vi.spyOn(mailService, "sendVerificationCode").mockResolvedValue();

    const result = await authService.sendVerificationCodeService("a@b.com");
    expect(result).toEqual({ message: "Verification code sent" });
    expect(fakeVerification.update).toHaveBeenCalled();
    expect(mailService.sendVerificationCode).toHaveBeenCalledWith(
      "a@b.com",
      "654321"
    );
  });

  it("sendVerificationCodeService: should throw if user not found", async () => {
    vi.spyOn(User, "findOne").mockResolvedValue(null);
    await expect(
      authService.sendVerificationCodeService("x@b.com")
    ).rejects.toThrow();
  });

  it("sendVerificationCodeService: should throw if max resend attempts reached", async () => {
    vi.spyOn(User, "findOne").mockResolvedValue({
      user_id: 1,
      email: "a@b.com",
    });
    vi.spyOn(UserVerification, "findOne").mockResolvedValue({
      resendAttempts: 5,
    });
    await expect(
      authService.sendVerificationCodeService("a@b.com")
    ).rejects.toThrow();
  });

  it("verifyCodeService: should verify user if code matches", async () => {
    const fakeUser = {
      user_id: 1,
      email: "a@b.com",
      update: vi.fn().mockResolvedValue(),
    };
    const fakeVerification = {
      code: "123456",
      expiresAt: new Date(Date.now() + 10000),
      failedAttempts: 5,
      destroy: vi.fn().mockResolvedValue(),
      update: vi.fn().mockResolvedValue(),
    };
    vi.spyOn(User, "findOne").mockResolvedValue(fakeUser);
    vi.spyOn(UserVerification, "findOne").mockResolvedValue(fakeVerification);

    const result = await authService.verifyCodeService({
      email: "a@b.com",
      code: "123456",
    });
    expect(result).toEqual({
      message: "User verified successfully",
      success: true,
    });
    expect(fakeUser.update).toHaveBeenCalledWith({ isActive: true });
    expect(fakeVerification.destroy).toHaveBeenCalled();
  });

  it("verifyCodeService: should throw if user not found", async () => {
    vi.spyOn(User, "findOne").mockResolvedValue(null);
    await expect(
      authService.verifyCodeService({ email: "x", code: "y" })
    ).rejects.toThrow();
  });

  it("verifyCodeService: should throw if verification not found", async () => {
    vi.spyOn(User, "findOne").mockResolvedValue({ user_id: 1 });
    vi.spyOn(UserVerification, "findOne").mockResolvedValue(null);
    await expect(
      authService.verifyCodeService({ email: "x", code: "y" })
    ).rejects.toThrow();
  });

  it("verifyCodeService: should throw if code expired", async () => {
    vi.spyOn(User, "findOne").mockResolvedValue({ user_id: 1 });
    const fakeVerification = {
      expiresAt: new Date(Date.now() - 10000),
      destroy: vi.fn().mockResolvedValue(),
    };
    vi.spyOn(UserVerification, "findOne").mockResolvedValue(fakeVerification);
    await expect(
      authService.verifyCodeService({ email: "x", code: "y" })
    ).rejects.toThrow();
    expect(fakeVerification.destroy).toHaveBeenCalled();
  });

  it("verifyCodeService: should throw if too many failed attempts", async () => {
    vi.spyOn(User, "findOne").mockResolvedValue({ user_id: 1 });
    vi.spyOn(UserVerification, "findOne").mockResolvedValue({
      expiresAt: new Date(Date.now() + 10000),
      failedAttempts: 0,
    });
    await expect(
      authService.verifyCodeService({ email: "x", code: "y" })
    ).rejects.toThrow();
  });

  it("verifyCodeService: should throw if code does not match", async () => {
    const fakeVerification = {
      code: "123456",
      expiresAt: new Date(Date.now() + 10000),
      failedAttempts: 5,
      update: vi.fn().mockResolvedValue(),
    };
    vi.spyOn(User, "findOne").mockResolvedValue({ user_id: 1 });
    vi.spyOn(UserVerification, "findOne").mockResolvedValue(fakeVerification);
    await expect(
      authService.verifyCodeService({ email: "x", code: "wrong" })
    ).rejects.toThrow();
    expect(fakeVerification.update).toHaveBeenCalled();
  });

  it("changePasswordService: should change password if all is valid", async () => {
    const fakeUser = {
      user_id: 1,
      password: "old",
      save: vi.fn().mockResolvedValue(),
    };
    vi.spyOn(User, "findByPk").mockResolvedValue(fakeUser);
    vi.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const dto = {
      currentPassword: "old",
      newPassword: "new",
      confirmPassword: "new",
    };
    const result = await authService.changePasswordService(1, dto);

    expect(result).toEqual({
      message: "Password changed successfully. You have been logged out.",
    });
    expect(fakeUser.password).toBe("new");
    expect(fakeUser.save).toHaveBeenCalled();
  });

  it("changePasswordService: should throw if fields missing", async () => {
    await expect(authService.changePasswordService(1, {})).rejects.toThrow();
  });

  it("changePasswordService: should throw if passwords do not match", async () => {
    await expect(
      authService.changePasswordService(1, {
        currentPassword: "a",
        newPassword: "b",
        confirmPassword: "c",
      })
    ).rejects.toThrow();
  });

  it("changePasswordService: should throw if user not found", async () => {
    vi.spyOn(User, "findByPk").mockResolvedValue(null);
    await expect(
      authService.changePasswordService(1, {
        currentPassword: "a",
        newPassword: "b",
        confirmPassword: "b",
      })
    ).rejects.toThrow();
  });

  it("changePasswordService: should throw if current password is incorrect", async () => {
    vi.spyOn(User, "findByPk").mockResolvedValue({ password: "old" });
    vi.spyOn(bcrypt, "compare").mockResolvedValue(false);
    await expect(
      authService.changePasswordService(1, {
        currentPassword: "a",
        newPassword: "b",
        confirmPassword: "b",
      })
    ).rejects.toThrow();
  });

  it("forgotPasswordService: should send reset link if user exists", async () => {
    const fakeUser = { user_id: 1, email: "a@b.com" };
    vi.spyOn(User, "findOne").mockResolvedValue(fakeUser);
    vi.spyOn(resetTokenUtils, "default").mockReturnValue("reset123");
    vi.spyOn(PasswordResetToken, "create").mockResolvedValue();
    vi.spyOn(mailService, "sendPasswordResetEmail").mockResolvedValue();

    const dto = { email: "a@b.com" };
    const result = await authService.forgotPasswordService(dto);

    expect(result).toEqual({ message: "Reset link sent to email" });
    expect(PasswordResetToken.create).toHaveBeenCalled();
    expect(mailService.sendPasswordResetEmail).toHaveBeenCalled();
  });

  it("forgotPasswordService: should throw if user not found", async () => {
    vi.spyOn(User, "findOne").mockResolvedValue(null);
    await expect(
      authService.forgotPasswordService({ email: "x" })
    ).rejects.toThrow();
  });

  it("resetPasswordService: should reset password if token valid", async () => {
    const fakeReset = { user_id: 1, expiresAt: new Date(Date.now() + 10000) };
    const fakeUser = { user_id: 1, save: vi.fn().mockResolvedValue() };
    vi.spyOn(PasswordResetToken, "findOne").mockResolvedValue(fakeReset);
    vi.spyOn(User, "findByPk").mockResolvedValue(fakeUser);
    vi.spyOn(PasswordResetToken, "destroy").mockResolvedValue();

    const dto = {
      token: "reset123",
      newPassword: "new",
      confirmPassword: "new",
    };
    const result = await authService.resetPasswordService(dto);

    expect(result).toEqual({ message: "Password updated successfully" });
    expect(fakeUser.password).toBe("new");
    expect(fakeUser.save).toHaveBeenCalled();
    expect(PasswordResetToken.destroy).toHaveBeenCalled();
  });

  it("resetPasswordService: should throw if passwords do not match", async () => {
    await expect(
      authService.resetPasswordService({
        token: "t",
        newPassword: "a",
        confirmPassword: "b",
      })
    ).rejects.toThrow();
  });

  it("resetPasswordService: should throw if token invalid or expired", async () => {
    vi.spyOn(PasswordResetToken, "findOne").mockResolvedValue(null);
    await expect(
      authService.resetPasswordService({
        token: "t",
        newPassword: "a",
        confirmPassword: "a",
      })
    ).rejects.toThrow();
  });

  it("resetPasswordService: should throw if user not found", async () => {
    vi.spyOn(PasswordResetToken, "findOne").mockResolvedValue({
      user_id: 1,
      expiresAt: new Date(Date.now() + 10000),
    });
    vi.spyOn(User, "findByPk").mockResolvedValue(null);
    await expect(
      authService.resetPasswordService({
        token: "t",
        newPassword: "a",
        confirmPassword: "a",
      })
    ).rejects.toThrow();
  });

  it("verifyPasswordService: should verify password if correct", async () => {
    const fakeUser = { user_id: 1, password: "hashed" };
    vi.spyOn(User, "findByPk").mockResolvedValue(fakeUser);
    vi.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const dto = { password: "plain" };
    const result = await authService.verifyPasswordService(1, dto);

    expect(result).toEqual({ message: "Password verified successfully." });
  });

  it("verifyPasswordService: should throw if password missing", async () => {
    await expect(authService.verifyPasswordService(1, {})).rejects.toThrow();
  });

  it("verifyPasswordService: should throw if user not found", async () => {
    vi.spyOn(User, "findByPk").mockResolvedValue(null);
    await expect(
      authService.verifyPasswordService(1, { password: "a" })
    ).rejects.toThrow();
  });

  it("verifyPasswordService: should throw if password incorrect", async () => {
    vi.spyOn(User, "findByPk").mockResolvedValue({ password: "hashed" });
    vi.spyOn(bcrypt, "compare").mockResolvedValue(false);
    await expect(
      authService.verifyPasswordService(1, { password: "a" })
    ).rejects.toThrow();
  });
});
