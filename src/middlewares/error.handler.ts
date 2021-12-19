import { Request, Response, NextFunction} from 'express';

export const logErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('logErrors: ', err);
  next(err);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
};
