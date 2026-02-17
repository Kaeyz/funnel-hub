import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { CustomEnum } from "src/utils/custom-decorators";
import { SortDirection } from "src/utils/common-enums";
import { FormSectionSortKeys, FormSectionStatus } from "./form-section.enums";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FormSectionInputDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  order: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  formId: string;
}
export class FormSectionStatusInputDto {
  @ApiProperty()
  @IsOptional()
  @CustomEnum(FormSectionStatus, "status")
  status?: FormSectionStatus;
}

export class GetFormSectionsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  formId: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  formSectionIds: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @CustomEnum(FormSectionStatus, "status")
  status?: FormSectionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @CustomEnum(SortDirection, "sortDir")
  sortDir: SortDirection;

  @ApiPropertyOptional()
  @IsOptional()
  @CustomEnum(FormSectionSortKeys, "sortKey")
  sortKey: FormSectionSortKeys;
}
