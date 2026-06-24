import { authService } from '../services/auth.service.js';
import { successData } from '../utils/success.js';

export const authController = {};

authController.register = async (req, res) => {
  await authService.register(req.body);
  successData(res, 201, data);
};

authController.login = async (req, res) => {
  const { email, passwordHash } = req.body;
  const { access_token, user } = await authService.login(email, passwordHash);
  res.status(200).json({ success: true, access_token, data: user });
};

authController.getMe = (req, res) => {
  res.status(200).json({
    success: true,
    data: { id: req.user.id, email: req.user.email, name: req.user.name },
  });
};
