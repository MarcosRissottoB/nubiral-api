export interface ResponseData {
  statusCode: number;
  message: string;
  user?: object;
  token?: string;
  err?: any;
}