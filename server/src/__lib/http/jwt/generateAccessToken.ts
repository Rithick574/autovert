import jwt from "jsonwebtoken";

interface UserPayload {
  _id: string;
  email: string;
  role: string;
}

export const generateAccessToken = (payload: UserPayload): string => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error("Access token secret is not defined!");
  }
  try {
    const { _id, email, role } = payload;
    return jwt.sign({ _id, email, role }, secret, { expiresIn: "24h" });
  } catch (error) {
    throw new Error("Failed to generate access token.");
  }
};