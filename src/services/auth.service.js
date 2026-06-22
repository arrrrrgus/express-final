import { createError } from '../utils/create.error.js';
import { hashService } from './hash.service.js';
import { jwtService } from './jwt.service.js';
import { userService } from './user.service.js';

export const authService = {};

authService.register = async (input) => {
  const hash = await hashService.hash(input.passwordHash);
  await userService.create({
    email: input.email,
    passwordHash: hash,
    name: input.name,
  });
};

authService.login = async (email, passwordHash) => {
  const user = await userService.findByEmail(email);
  if (!user) {
    createError(401, 'InValid email or password');
  }

  const isMatch = await hashService.compare(passwordHash, user.passwordHash);
  if (!isMatch) {
    createError(401, 'InValid email or password');
  }
  const access_token = jwtService.sign({
    sub: user.id,
    email: user.email,
  });
  const { passwordHash: _, ...userWithoutPassword } = user;
  return { access_token, user: userWithoutPassword };
};
