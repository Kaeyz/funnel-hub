import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FileInputDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  leadId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  questionId: string;
}
