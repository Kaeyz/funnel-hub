import { UploadApiErrorResponse } from "cloudinary";
import { Express } from "express";

export type CloudinaryApiResource = {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
  next_cursor: string;
  derived: {
    transformation: string;
    format: string;
    bytes: number;
    id: string;
    url: string;
    secure_url: string;
  }[];
};

type MediaFile = {
  fileId: string;
  fileName: string;
  url: string;
};

export type FileUploadResponse =
  | { status: "success"; data: MediaFile }
  | { status: "failed"; data: UploadApiErrorResponse | null };

export type IMediaUpload = {
  file: Express.Multer.File;
  name: string;
  entityName: string;
  entityId: string;
};
