import { Injectable, BadRequestException } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { IMediaUpload } from "./cloudinary/cloudinary.types";
import { FileInputDto } from "./upload.dto";
import { LeadsService } from "../leads/leads.service";

@Injectable()
export class UploadService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly leadsService: LeadsService
  ) { }

  async upload(file: Express.Multer.File, options: FileInputDto) {
    if (!file) {
      throw new BadRequestException("File is required");
    }

    const fileData: IMediaUpload = {
      entityId: options.leadId,
      entityName: "questions",
      name: options.questionId,
      file,
    };

    const res = await this.cloudinaryService.upload(fileData);
    if (res.status === "failed") throw new BadRequestException(res.data?.message);

    return this.leadsService.updateLeadData(options.leadId, {[options.questionId] : res.data.url })
  }
}
