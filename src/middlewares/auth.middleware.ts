import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/crypto.utils";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // 1. Get the Authorization header (e.g., "Bearer eyJhbGciOi...")
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "Authorization token missing or malformed" });
    return;
  }

  // 2. Extract the raw token string
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify the access token using your existing helper
    const decodedPayload = verifyAccessToken(token);

    // 4. Attach the user payload (e.g., { userId }) directly to the request object
    req.user = decodedPayload;
    // 5. Pass execution along to the next middleware or controller
    next();
  } catch (error) {
    // If jwt.verify throws an error, the token is expired or altered
    res.status(401).json({ message: "Invalid or expired authorization token" });
    return;
  }
};
