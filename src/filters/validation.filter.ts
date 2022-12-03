import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

import { ValidationException } from "src/filters/validation.exception";

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        return response.status(400).json({
            status: '400',
            createdBy: 'ValidationFilter',
            errorMessage: exception.validationError
        });
    }
}