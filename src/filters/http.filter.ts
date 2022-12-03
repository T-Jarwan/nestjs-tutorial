import { ArgumentsHost, ExceptionFilter, Catch, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HTTPExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const statusCode = exception.getStatus();
        const response = ctx.getResponse<Response>();
        const exceptionResponse = exception.getResponse();

        console.log("exception", exception);
        if (typeof exceptionResponse === 'object') {
            return response.status(statusCode).json({
                status: statusCode,
                createdBy: 'HTTPExceptionFilter',
                errorMessage: exceptionResponse['message']
            });
        }

        return response.status(statusCode).json({
            status: statusCode,
            createdBy: 'HTTPExceptionFilter',
            errorMessage: exception.message
        });
    }

}