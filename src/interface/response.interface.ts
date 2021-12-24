export interface ResponseData {
  statusCode: number;
  message: string;
  data?: object;
  token?: string;
  err?: any;
}