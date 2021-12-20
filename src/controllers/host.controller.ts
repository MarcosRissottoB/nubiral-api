import { NextFunction, Request, Response} from 'express';
import { fetchHost } from '../services/host.service';
import { ResponseData } from '../interface/response.interface';

export const getHost = async (req: Request, res: Response, next: NextFunction) => {
  console.log('getHost');
  try {
    const { statusCode, message, data, token }: ResponseData = await fetchHost();
    res.status(statusCode).header('authorization', token).json({message, data});
  } catch(err) {
    console.log('Profile', err);
    next(err);
  }
}