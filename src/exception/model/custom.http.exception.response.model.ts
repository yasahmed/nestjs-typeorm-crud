import { HttpExceptionResponse } from "./http.exception.response.model";

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
}
  