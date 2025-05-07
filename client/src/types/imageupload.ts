export interface ImageUploadResponse {
  imageId: string;
  imageUrl: string;
  thumbnailUrl?: string;
  metadata: {
    originalFileName: string;
    fileSize: number;
    width?: number;
    height?: number;
  };
}

export interface ImageUploadDto {
  ImageFile: File;
  Title?: string;
  Description?: string;
}
