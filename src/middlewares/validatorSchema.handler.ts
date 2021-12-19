import { Request, Response, NextFunction} from 'express';
import boom from '@hapi/boom';

export const validatorSchema = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const {error} = schema.validate(data);
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}