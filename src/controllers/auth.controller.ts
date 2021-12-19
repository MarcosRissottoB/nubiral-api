import { NextFunction, Request, Response} from 'express';
import {register, login, getProfile } from '../services/auth.services';
import { ResponseData } from '../interface/response.interface';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { statusCode, message, user, token }: ResponseData = await register(req.body);
    res.status(statusCode).header('auth', token).json({message, user});
  } catch(err) {
    console.log('Signup', err);
    next(err);
    // res.status(500).json({message: 'Err', err});
  }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { statusCode, message, user, token }: ResponseData = await login(req.body);
    res.status(statusCode).header('auth', token).json({message, user});
  } catch(err) {
    console.log('Signin', err);
    next(err);
    // res.status(500).json({message: 'Err', err});
  }
}

export const profile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { statusCode, message, user, token }: ResponseData = await getProfile(req.userId);
    res.status(statusCode).header('auth', token).json({message, user});
  } catch(err) {
    console.log('Profile', err);
    next(err);
    // res.status(500).json({message: 'Error', err});
  }
}