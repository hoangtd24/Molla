import { Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "src/entities/User";

export const createToken = (
  type: "accessToken" | "refreshToken",
  user: User
) => {
  return jwt.sign(
    { userId: user.id },
    type === "accessToken"
      ? (process.env.ACCESS_TOKEN_SECRET as Secret)
      : (process.env.ACCESS_TOKEN_SECRET as Secret),
    { expiresIn: type === "accessToken" ? "1m" : "5d" }
  );
};

export const sendRefreshToken = (res: Response, user: User) => {
  res.cookie(
    process.env.REFRESH_TOKEN_NAME as string,
    createToken("refreshToken", user),
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/refresh_token",
    }
  );
};
