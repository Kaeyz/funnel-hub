import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { ConfigModule } from "@nestjs/config";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { UploadService } from "./upload.service";
import { LeadsModule } from "../leads/leads.module";

@Module({
  imports: [ConfigModule, LeadsModule],
  providers: [UploadService, CloudinaryService],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
