import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min } from "class-validator";
import { CustomEnum } from "src/utils/custom-decorators";
import { SortDirection } from "src/utils/common-enums";
import { LeadsSortKeys } from "./leads.enums";

export class LeadsInputDto {
  @IsNotEmpty()
  @IsString()
  formId: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsObject()
  formData: Record<string, string>;

  @IsNotEmpty()
  @IsObject()
  formStructure: Record<string, string[]>;
}

export class GetLeadsDto {
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
  @CustomEnum(SortDirection, "sortDir")
  sortDir: SortDirection;

  @IsOptional()
  @CustomEnum(LeadsSortKeys, "sortKey")
  sortKey: LeadsSortKeys;
}
