import { Type } from "class-transformer";
import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { CustomEnum } from "src/utils/custom-decorators";
import { SortDirection } from "src/utils/common-enums";
import { QuestionSortKeys, QuestionStatus, QuestionType } from "./question.enums";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

class QuestionValidation {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  required: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  min: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  max: number;
}

export class QuestionInputDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  formSectionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsNotEmpty()
  @CustomEnum(QuestionType, "type")
  type: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => QuestionValidation)
  validation: QuestionValidation;
}

export class GetQuestionsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  formSectionId: string;

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
  @CustomEnum(QuestionStatus, "status")
  status?: QuestionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @CustomEnum(SortDirection, "sortDir")
  sortDir: SortDirection;

  @ApiPropertyOptional()
  @IsOptional()
  @CustomEnum(QuestionSortKeys, "sortKey")
  sortKey: QuestionSortKeys;
}
