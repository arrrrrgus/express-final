import { jwtService } from '../services/jwt.service.js';
import { userService } from '../services/user.service.js';
import { createError } from '../utils/create.error.js';

export const authenticate = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    createError(400, 'Authorization is missing');
  }
  if (!authorization.startsWith('Bearer ')) {
    createError(400, 'Invalid authorization schema');
  }
  const token = authorization.split(' ')[1];

  try {
    const payload = jwtService.verify(token);
    const user = await userService.findById(payload.sub);
    if (!user) {
      createError(404, 'User not found');
    }
    req.user = user;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      createError(404, 'User not found');
    }
    if (error.name === 'JsonWebTokenError') {
      createError(401, 'Invalid token');
    }
  }
  next();
};
