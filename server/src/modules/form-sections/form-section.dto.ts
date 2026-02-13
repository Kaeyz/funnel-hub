import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { CustomEnum } from "src/utils/custom-decorators";
import { SortDirection } from "src/utils/common-enums";
import { FormSectionSortKeys, FormSectionStatus } from "./form-section.enums";

export class FormSectionInputDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsMongoId()
  formId: string;
}

export class GetFormSectionsDto {
  @IsNotEmpty()
  @IsMongoId()
  formId: string;

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
  @CustomEnum(FormSectionStatus, "status")
  status?: FormSectionStatus;

  @IsOptional()
  @CustomEnum(SortDirection, "sortDir")
  sortDir: SortDirection;

  @IsOptional()
  @CustomEnum(FormSectionSortKeys, "sortKey")
  sortKey: FormSectionSortKeys;
}
