import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../interface/tokenPayload.interface';
const SECRET_KEY = process.env.SECRET_KEY;

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('authorization');
  if(!token) return res.status(401).json('Access denied');
  const payload = jwt.verify(token, SECRET_KEY || 'tokentest') as TokenPayload;
  req.userId = payload._id;
  next();
}