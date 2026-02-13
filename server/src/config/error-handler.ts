import { BadRequestException, HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";

export const errorhandler = (app: INestApplication<any>) => {
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const formattedErrors: Record<string, string> = {};
        errors.forEach((error) => {
          if (error.constraints) {
            formattedErrors[error.property] = Object.values(error.constraints)[0];
          }
        });
        return new BadRequestException({
          errors: formattedErrors,
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Input Validation Error",
        });
      },
    })
  );

  return app;
};
