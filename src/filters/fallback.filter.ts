import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {

        const ctx = host.switchToHttp();

        // const statusCode = exception.getStatus();
        const response = ctx.getResponse();
        // const request = ctx.getRequest();

        return response.status(500).json({
            status: '500',
            createdBy: 'FallbackExceptionFilter',
            errorMessage: exception.message ? exception.message : 'Unexpected Error Occurred'
        });
    }

}