import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";

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
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Input Validation Error",
          data: formattedErrors,
        });
      },
    })
  );

  return app;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = exception.getStatus();
    const res = exception.getResponse();

    let message: string;
    let data: unknown = null;

    if (typeof res === "string") {
      message = res;
    } else if (typeof res === "object" && res !== null) {
      const obj = res as Record<string, unknown>;

      message = typeof obj.message === "string" ? obj.message : "Error";

      data = obj.data ?? null;
    } else {
      message = "Error";
    }

    response.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }
}
