import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const hashService = {};

hashService.hash = (plain) => bcrypt.hash(plain, SALT_ROUNDS);
hashService.compare = (plain, hashed) => bcrypt.compare(plain, hashed);
