import AuthLoginRequestDTO from "../dto/auth/requests/LoginUserDTO.js";
import AuthRegisterRequestDTO from "../dto/auth/requests/RegisterUserDTO.js";
import AuthChangePasswordDTO from "../dto/auth/requests/ChangePasswordDTO.js";
import VerifyPasswordDTO from "../dto/auth/requests/VerifyPasswordDTO.js";
import * as authService from "../services/auth.service.js";
import config from '../config/config.js';

export const register = async (req, res) => {
  try {
    const dto = new AuthRegisterRequestDTO(req.body);
    const result = await authService.registerUserService(dto);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const dto = new AuthLoginRequestDTO(req.body);
    const { token, user } = await authService.loginUserService(dto);

    res.cookie('token', token, {
      httpOnly: true,
      expiresIn: config.development.jwtExpiration,
      algorithm: 'HS512',
      notimestamp: true, 
      });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    const result = await authService.logoutUserService();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body; 
    
    const result = await authService.sendVerificationCodeService(email);
    
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const result = await authService.verifyCodeService({ email, code });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

export const changePassword = async (req, res) => {
  try {
    const dto = new AuthChangePasswordDTO(req.body);
    const userId = req.user.id;  
    const result = await authService.changePasswordService(userId, dto);
    res.clearCookie('token');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPasswordService({ email });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    const result = await authService.resetPasswordService({ token, newPassword, confirmPassword });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const verifyPassword = async (req, res) => {
  try {
    const dto = new VerifyPasswordDTO(req.body);
    const userId = req.user.id;
    const result = await authService.verifyPasswordService(userId, dto);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};