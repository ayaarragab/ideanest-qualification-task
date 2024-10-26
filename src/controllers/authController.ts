import { Response, Request } from "express";
import { signupUser, signinUser, refreshAccessToken } from "../services/authServices";
import serverErrorsHandler from "../utils/errorHandlers";

export const signup = async (request: Request<{}, {}, { name: string, email: string, password: string }>, response: Response) => {
  try {
    await signupUser(request.body);
    response.status(200).json({ message: `You've signed up successfully` });
  } catch (error) {
    serverErrorsHandler(response, error);
  }
}

export const signin = async (request: Request<{}, {}, { email: string, password: string }>, response: Response) => {
  try {
    const { user, access_token, refresh_token } = await signinUser(request.body);
    response.status(200).json({ message: `You've signed in successfully`, access_token, refresh_token });
  } catch (error) {
    serverErrorsHandler(response, error);
  }
}

export const refreshTokenrequest = async (request: Request<{}, {}, { refresh_token: string }>, response: Response) => {
  const { accessToken, newRefreshToken } = await refreshAccessToken(request.body.refresh_token);
  if (accessToken && newRefreshToken) {
    response.status(200).json({
      message: `Here's your new tokens`,
      access_token: accessToken,
      refresh_token: newRefreshToken
    })
  }
}
