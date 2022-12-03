// Packages
import { NestFactory } from '@nestjs/core';
import { ValidationError, ValidationPipe } from '@nestjs/common';

// Modules
import { AppModule } from 'src/modules/app.module';

// Filters
import { HTTPExceptionFilter } from 'src/filters/http.filter';
import { FallbackExceptionFilter } from 'src/filters/fallback.filter';
import { ValidationException } from 'src/filters/validation.exception';
import { ValidationFilter } from 'src/filters/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HTTPExceptionFilter(),
    new ValidationFilter()
  );

  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    exceptionFactory: (errors: ValidationError[]) => {

      const messages = errors.map(
        error => `${error.property} has wrong value ${error.value},
          ${Object.values(error.constraints).join(', ')} `
      );

      return new ValidationException(messages);
    }
  }));

  await app.listen(9000);
}
bootstrap();
