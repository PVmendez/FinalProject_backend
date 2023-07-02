import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.SECRET_KEY!, (err: any, user: any) => {
      if (err || !user) {
        return res.status(403).send("Invalid token");
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export default verifyToken;
