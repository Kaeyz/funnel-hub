import { applyDecorators } from "@nestjs/common";
import { IsEnum } from "class-validator";

export function CustomEnum<T extends object>(enumObj: T, field: string): PropertyDecorator {
  return applyDecorators(
    IsEnum(enumObj, {
      message: `${field} must be one of ${Object.values(enumObj).join(", ")}`,
    })
  );
}
