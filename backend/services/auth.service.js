import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';
import UserVerification from '../models/userVerification.model.js';
import PasswordResetToken from '../models/passwordResendTokens.model.js';
import generateVerificationCode from '../utils/generateVerificationCode.js';
import generateResetToken from '../utils/generateResetToken.js';
import { sendVerificationCode, sendPasswordResetEmail } from './mail.service.js';

export async function registerUserService(dto) {
  const { name, email, password, role } = dto;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) throw new Error('User already exists');

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user);

  const code = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await UserVerification.create({
    user_id: user.user_id,
    code,
    expiresAt,
    failedAttempts: 5,
    resendAttempts: 0,
  });

  await sendVerificationCode(user.email, code);

  return { token, user };
}

export async function loginUserService(dto) {
  const { email, password } = dto;

  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');
  if (!user.isActive) throw new Error('Account not verified');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateToken(user);
  return { token, user };
}

export async function logoutUserService() {
  return { message: 'Successfully logged out' };
}

export async function sendVerificationCodeService(email) {
  const user = await User.findOne({ where: { email } });
if (!user) {
  console.log('User not found for email:', email);
  throw new Error('User not found');
}

  let verification = await UserVerification.findOne({ where: { user_id: user.user_id } });

  if (verification && verification.resendAttempts >= 5) {
    throw new Error('Maximum resend attempts reached');
  }

  const code = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); 

  if (verification) {
    await verification.update({
      code,
      resendAttempts: verification.resendAttempts + 1,
      failedAttempts: 0,
      expiresAt,
    });
  } else {
    await UserVerification.create({
      user_id: user.id,
      code,
      resendAttempts: 1,
      failedAttempts: 0,
      expiresAt,
    });
  }

  await sendVerificationCode(user.email, code);
  
  return { message: 'Verification code sent' };
}

export async function verifyCodeService({ email, code }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const verification = await UserVerification.findOne({ where: { user_id: user.user_id } });
  if (!verification) throw new Error('Verification not found');

  const now = new Date();
  if (verification.expiresAt < now) {
    await verification.destroy();
    throw new Error('Verification code expired');
  }

  if (verification.failedAttempts <= 0) {
    throw new Error('Too many failed attempts');
  }

  if (verification.code !== code) {
    await verification.update({ failedAttempts: verification.failedAttempts - 1 });
    throw new Error('Invalid code');
  }

  await user.update({ isActive: true });
  await verification.destroy();
  return { message: 'User verified successfully', success: true};
}

export async function changePasswordService(userId, dto) {
  const { currentPassword, newPassword, confirmPassword } = dto;

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error('All fields are required');
  }

  if (newPassword !== confirmPassword) {
    throw new Error('New passwords do not match');
  }

  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error('Current password is incorrect');

  user.password = newPassword;
  await user.save();

  return { message: 'Password changed successfully. You have been logged out.' };
}

export async function forgotPasswordService(dto) {
  const { email } = dto;

  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const token = generateResetToken();
  const expiresAt = new Date(Date.now() + 3600000);

  await PasswordResetToken.create({ token, user_id: user.user_id, expiresAt });

  const resetLink = `http://localhost:5173/reset-password/${token}`;
  await sendPasswordResetEmail(email, resetLink);

  return { message: 'Reset link sent to email' };
}

export async function resetPasswordService(dto) {
  const { token, newPassword, confirmPassword } = dto;

  if (newPassword !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const reset = await PasswordResetToken.findOne({ where: { token } });

  if (!reset || reset.expiresAt < new Date()) {
    throw new Error('Token is invalid or expired');
  }

  const user = await User.findByPk(reset.user_id);
  if (!user) throw new Error('User not found');

  user.password = newPassword;
  await user.save();
  await PasswordResetToken.destroy({ where: { user_id: user.user_id } });

  return { message: 'Password updated successfully' };
}

export async function verifyPasswordService(userId, dto) {
  const { password } = dto;

  if (!password) {
    throw new Error("Password is required");
  }

  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }

  return { message: "Password verified successfully." };
}