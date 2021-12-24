import { NextFunction, Request, Response} from 'express';
import {register, login, getUserProfile } from '../services/auth.services';
import { ResponseData } from '../interface/response.interface';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { statusCode, message, data }: ResponseData = await register(req.body);
    res.status(statusCode).json({message, data });
  } catch(err) {
    next(err);
  }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { statusCode, message, data }: ResponseData = await login(req.body);
    res.status(statusCode).json({message, data});
  } catch(err) {
    next(err);
  }
}

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { statusCode, message, data }: ResponseData = await getUserProfile(req.userId);
    res.status(statusCode).json({message, data});
  } catch(err) {
    next(err);
  }
}