export interface ResponseData {
  statusCode: number;
  message: string;
  userData?: object;
  token?: string;
  err?: any;
}