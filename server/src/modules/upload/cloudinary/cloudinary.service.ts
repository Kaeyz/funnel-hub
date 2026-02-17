import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiOptions, UploadApiResponse } from "cloudinary";
import { FileUploadResponse, IMediaUpload } from "./cloudinary.types";

const uploadBuffer = (buffer: Buffer, options: UploadApiOptions): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      return resolve(result as UploadApiResponse);
    });
    stream.end(buffer);
  });
};

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>("cloudinary_cloud_name"),
      api_key: this.configService.get<string>("cloudinary_api_key"),
      api_secret: this.configService.get<string>("cloudinary_api_secret"),
    });
  }

  async upload(fileData: IMediaUpload): Promise<FileUploadResponse> {
    const response: FileUploadResponse = { status: "failed", data: null };
    const folder = `funnel_hub/${fileData.entityName}/${fileData.entityId}`;

    const uploadOptions: UploadApiOptions = {
      folder,
      public_id: fileData.name,
      resource_type: "auto",
    };

    const uploadRes = await uploadBuffer(fileData.file.buffer, uploadOptions).catch((err: UploadApiErrorResponse) => {
      response.data = err;
    });
    if (response.data || !uploadRes) return response;

    return {
      status: "success",
      data: {
        fileId: uploadRes.public_id,
        fileName: fileData.file.originalname,
        url: uploadRes.secure_url,
      },
    };
  }
}
