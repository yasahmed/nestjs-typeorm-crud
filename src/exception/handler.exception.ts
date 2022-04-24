import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response, Request } from 'express';
  
  import * as fs from 'fs';
import { BusinessException } from './definition/custom.business.exception';
import { CustomHttpExceptionResponse } from './definition/custom.http.exception';
import { HttpExceptionResponse } from './model/http.exception.response.model';
  
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      let status: HttpStatus;
      let errorMessage: string;

      if (exception instanceof BadRequestException) {
        status = exception.getStatus();
        errorMessage =errorMessage = exception.getResponse()['message'];
      }
      else if (exception instanceof BusinessException) {
        status = exception.getStatus();
        errorMessage = exception.message;
      }
      else if (exception instanceof HttpException) {
        status = exception.getStatus();
        const errorResponse = exception.getResponse();
        errorMessage =
          (errorResponse as HttpExceptionResponse).error || exception.message;
      } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        errorMessage = 'Critical internal server error occurred!';
      }
  
      const errorResponse = this.getErrorResponse(status, errorMessage, request);
      const errorLog = this.getErrorLog(errorResponse, request, exception);
      this.writeErrorLogToFile(errorLog);
      response.status(status).json(errorResponse);
    }
  
    private getErrorResponse = (
      status: HttpStatus,
      errorMessage: string,
      request: Request,
    ): CustomHttpExceptionResponse => ({
      statusCode: status,
      error: errorMessage,
      path: request.url,
      method: request.method,
      timeStamp: new Date(),
    });
  
    private getErrorLog = (
      errorResponse: CustomHttpExceptionResponse,
      request: Request,
      exception: unknown,
    ): string => {
      const { statusCode, error } = errorResponse;
      const { method, url } = request;
      const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url}\n\n
      ${JSON.stringify(errorResponse)}\n\n
      User: AnonymousUser\n\n
      ${exception instanceof HttpException ? exception.stack : error}\n\n`;
      return errorLog;
    };
  
    private writeErrorLogToFile = (errorLog: string): void => {
      fs.appendFile('error.log', errorLog, 'utf8', (err) => {
        if (err) throw err;
      });
    };
  }