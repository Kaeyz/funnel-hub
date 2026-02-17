import { Controller, Post, UploadedFile, UseInterceptors, Body } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { FileInputDto } from "./upload.dto";

@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: FileInputDto) {
    return this.uploadService.upload(file, body);
  }
}
