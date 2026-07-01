import { authService } from '../services/auth.service.js';
import { successData } from '../utils/success.js';

export const authController = {};

authController.register = async (req, res) => {
  const data = await authService.register(req.body);
  successData(res, 201, {
    id: data.id,
    email: data.email,
    name: data?.name,
  });
  console.log(data, 'data');
};

authController.login = async (req, res) => {
  const { email, passwordHash } = req.body;
  const { access_token, user } = await authService.login(email, passwordHash);
  res.status(200).json({ success: true, access_token, data: user });
};

authController.getMe = (req, res) => {
  successData(res, 200, {
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
  });
};
