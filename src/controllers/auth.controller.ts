import { Request, Response} from 'express';
import {register, login, getProfile } from '../services/auth.services';
import { ResponseData } from '../interface/response.interface';

export const signup = async (req: Request, res: Response) => {
  try {
    const { statusCode, message, user, token }: ResponseData = await register(req.body);
    res.status(statusCode).header('auth', token).json({message, user});
  } catch(err) {
    console.log('Signup', err);
    res.status(500).json({message: 'Err', err});
  }
}

export const signin = async (req: Request, res: Response) => {
  try {
    const { statusCode, message, user, token }: ResponseData = await login(req.body);
    res.status(statusCode).header('auth', token).json({message, user});
  } catch(err) {
    console.log('Signin', err);
    res.status(500).json({message: 'Err', err});
  }
}

export const profile = async (req: Request, res: Response) => {
  try {
    const { statusCode, message, user, token }: ResponseData = await getProfile(req.userId);
    res.status(statusCode).header('auth', token).json({message, user});
  } catch(err) {
    console.log('Profile', err);
    res.status(500).json({message: 'Error', err});
  }
}