import { authService } from '../services/auth.service.js';
import { successData } from '../utils/success.js';

export const authController = {};

authController.register = async (req, res) => {
  await authService.register(req.body);
  res
    .status(201)
    .json({ message: 'User register successfully', success: successData });
};

authController.login = async (req, res) => {
  const { email, passwordHash } = req.body;
  const { access_token, user } = await authService.login(email, passwordHash);
  res.status(200).json({ success: true, access_token, user });
};

authController.getMe = (req, res) => {
  res.status(200).json({ user: req.user });
};
