import { NextFunction, Request, Response} from 'express';
import { fetchHost } from '../services/host.service';

export const getHost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = await fetchHost();
    res.status(200).json(data);
  } catch(err) {
    next(err);
  }
}