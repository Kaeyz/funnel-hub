import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { CustomEnum } from "src/utils/custom-decorators";
import { SortDirection } from "src/utils/common-enums";
import { FormSortKeys, FormStatus } from "./form.enums";

export class FormInputDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  key: string;
}
export class FormStatusInputDto {
  @IsOptional()
  @CustomEnum(FormStatus, "status")
  status?: FormStatus;
}

export class GetFormsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @CustomEnum(FormStatus, "status")
  status?: FormStatus;

  @IsOptional()
  @CustomEnum(SortDirection, "sortDir")
  sortDir: SortDirection;

  @IsOptional()
  @CustomEnum(FormSortKeys, "sortKey")
  sortKey: FormSortKeys;
}
