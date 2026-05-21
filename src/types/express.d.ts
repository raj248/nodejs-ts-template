import { TokenPayload } from "../utils/crypto.utils";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
