import { Type } from "class-transformer";
import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { CustomEnum } from "src/utils/custom-decorators";
import { SortDirection } from "src/utils/common-enums";
import { QuestionSortKeys, QuestionStatus, QuestionType } from "./question.enums";

class QuestionValidation {
  @IsOptional()
  @IsBoolean()
  required: boolean;

  @IsOptional()
  @IsNumber()
  min: number;

  @IsOptional()
  @IsNumber()
  max: number;
}

export class QuestionInputDto {
  @IsNotEmpty()
  @IsMongoId()
  formSectionId: string;

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @CustomEnum(QuestionType, "type")
  type: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => QuestionValidation)
  validation: QuestionValidation;
}

export class GetQuestionsDto {
  @IsNotEmpty()
  @IsMongoId()
  formSectionId: string;

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
  @CustomEnum(QuestionStatus, "status")
  status?: QuestionStatus;

  @IsOptional()
  @CustomEnum(SortDirection, "sortDir")
  sortDir: SortDirection;

  @IsOptional()
  @CustomEnum(QuestionSortKeys, "sortKey")
  sortKey: QuestionSortKeys;
}
