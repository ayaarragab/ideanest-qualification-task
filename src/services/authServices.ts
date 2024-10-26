import { createJWT, hashPassword, comparePasswords, verifyRefreshToken } from "../utils/authHelpers";
import User from "../models/user";

export const signupUser = async (userData: { name: string, email: string, password: string }) => {
  const { name, email, password } = userData;

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ name, email, password: hashedPassword });

  const access_token = createJWT(
    { id: String(newUser._id), email: newUser.email },
    "access",
    "15m" // Access token expires in 15 minutes
  );

  const refresh_token = createJWT(
    { id: String(newUser._id), email: newUser.email },
    "refresh",
    "7d"
  );

  return { user: newUser, access_token, refresh_token };
};

export const signinUser = async (userData: { email: string, password: string }) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePasswords(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const access_token = createJWT(
    { id: String(user._id), email: user.email },
    "access",
    "15m"
  );

  const refresh_token = createJWT(
    { id: String(user._id), email: user.email },
    "refresh",
    "7d"
  );

  return { user, access_token, refresh_token };
};

export const refreshAccessToken = async (refresh_token: string) => {
  try {
    const decoded = verifyRefreshToken(refresh_token);

    const accessToken = createJWT(
      { id: decoded.id, email: decoded.email },
      "access",
      "15m"
    );

    const newRefreshToken = createJWT(
      { id: decoded.id, email: decoded.email },
      "refresh",
      "7d"
    );
    return { accessToken, newRefreshToken }
  } catch (error) {
    return { accessToken: "", newRefreshToken: "" };
  }
};
