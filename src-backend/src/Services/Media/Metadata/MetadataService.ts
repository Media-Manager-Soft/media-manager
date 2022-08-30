import {MediaExtensionTypes, MediaType} from "../../../Enums/MediaType";
import {Media} from "../../../Entities/Media";
import * as fs from "fs";
import {PhotoMetadataService} from "./Metadata/PhotoMetadataService";
import {VideoMetadataService} from "./Metadata/VideoMetadataService";
import {IMetadata} from "./Metadata/IMetadata";
import {UnsupportedExtension} from "../../../Exceptions/UnsupportedExtension";

const path = require('path');

export class MetadataService {
  private media: Media;
  private fileMetadata: IMetadata;

  async setFile(media: Media) {
    this.media = media;
    this.media.type = await this.getFileType()
    await this.getFileMetadata();
  }

  async getFileMetadata() {
    if (!this.media.type) {
      throw new Error('No media type provided')
    }

    if (!this.fileMetadata) {
      if (this.media.type === MediaType.VIDEO) {
        this.fileMetadata = await new VideoMetadataService().getMetadata(this.media.originalPath);
      } else {
        this.fileMetadata = await new PhotoMetadataService().getMetadata(this.media.originalPath);
      }
    }
  }

  getFilePathInLocation() {
    return path.dirname(this.media.originalPath.replace(this.media.location.path, ''))
  }

  getFileName() {
    return path.basename(this.media.originalPath)
  }

  async getFileType() {
    let ext = path.extname(this.media.originalPath).toLocaleLowerCase();
    let type = MediaExtensionTypes[ext];
    if (type === undefined) {
      throw new UnsupportedExtension(`Unsupported file type`)
    }
    return type;
  }

  getCameraModel() {
    return this.fileMetadata.model;
  }

  getCameraManufacturer() {
    return this.fileMetadata.make;
  }

  getHeight() {
    return parseInt(this.fileMetadata.imageHeight);
  }

  getWidth() {
    return parseInt(this.fileMetadata.imageWidth);
  }

  getTakenAt() {
    return this.fileMetadata.dateTimeOriginal?.toString();
  }

  getLatitude() {
    return this.fileMetadata.latitude
  }

  getLongitude() {
    return this.fileMetadata.longitude
  }

  getOrientation() {
    return this.fileMetadata.orientation
  }

  getFileSize() {
    return fs.statSync(this.media.originalPath).size;
  }

}

