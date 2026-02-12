import { HttpStatus } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

export function buildResponse<Doc, Entity>(
  data: Doc,
  dtoClass: new (...args: any[]) => Entity,
  message: string = "Operation Successful"
) {
  const sanitizedData = plainToInstance(dtoClass, data);
  return { message, data: sanitizedData, statusCode: HttpStatus.OK };
}
