import { HttpExceptionResponse } from "../model/http.exception.response.model";

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
}
  