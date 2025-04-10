import jwt from "jsonwebtoken";
import { type Result, err, ok } from "neverthrow";

export const safeJwtVerify = (
  token: string,
  key: string,
): Result<string | jwt.JwtPayload, jwt.JsonWebTokenError> => {
  try {
    return ok(jwt.verify(token, key));
  } catch (error) {
    return err(error as jwt.JsonWebTokenError);
  }
};
