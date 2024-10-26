import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import process from 'process';

const JWT_SECRET = '621e5e9893db6a9a1a7da3ca0f3352750d8439b79d694859dcf274d7140ab8443a69ca6712b3d004d80ba72dd5e691f52bd97364cf8b2eb5795ae1cc31db1c17';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "d84ff23021e9155dfbe1b8a87a579a5b481589723cdd49c0d27ce828c83034966b79b9221b69aa8296d556b24c9a20f2fdd3ed4363d28f50e166c728daf41a67";


export const createJWT = (user: { id: string, email: string }, accessOrRefresh: string, expiresIn: string) => {
  if (accessOrRefresh == 'access') {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn }
    );
    return token;
  }
  else if (accessOrRefresh == 'refresh') {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn }
    );
    return token;
  }
};

export const verifyJWT = async (token: string) => {
  try {
    const userJWT: jwt.JwtPayload | string = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET);
    if (typeof userJWT !== 'string' && userJWT.id) {
      try {
        const user = await User.findById(userJWT.id);
        if (user) return user;
      } catch (error) {
        console.log('user not found');
        return false;
      }
    }
  } catch (error) {
    console.log('unknown token not found');
    return false;
  }
}

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 5);
}

export const comparePasswords = (passwordPlain: string, hashedPassword: string) => {
  return bcrypt.compare(passwordPlain, hashedPassword);
}


export const verifyRefreshToken = (refresh_token: string) => {
  if (!refresh_token) {
    throw new Error("Refresh token is required");
  }

  try {
    const decoded = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET) as { id: string, email: string };
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};
