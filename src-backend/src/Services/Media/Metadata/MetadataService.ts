import { MediaExtensionTypes, MediaType } from "../../../Enums/MediaType";
import { Location } from "../../../Entities/Location";
import { Media } from "../../../Entities/Media";
import * as fs from "fs";
import { PhotoMetadataService } from "./Metadata/PhotoMetadataService";
import { VideoMetadataService } from "./Metadata/VideoMetadataService";
import { IMetadata } from "./Metadata/IMetadata";
import { UnsupportedExtension } from "../../../Exceptions/UnsupportedExtension";

const path = require('path');
const checksum = require('checksum')

export class MetadataService {
  private pathToFile: string;
  private media: Media;
  private fileMetadata: IMetadata;

  async setFile(media: Media, pathToFile: string, location: Location) {
    //Todo move toMediaService
    this.media = media;
    this.media.location = location;
    this.pathToFile = pathToFile;
    this.media.type = await this.getFileType()
    this.media.checkSum = await this.getCheckSum();
    await this.getFileMetadata();
  }

  async getFileMetadata() {
    if (!this.media.type) {
      throw new Error('No media type provided')
    }

    if (!this.fileMetadata) {
      if (this.media.type === MediaType.VIDEO) {
        this.fileMetadata = await new VideoMetadataService().getMetadata(this.pathToFile);
      } else {
        this.fileMetadata = await new PhotoMetadataService().getExifForFile(this.pathToFile);
      }
    }
  }

  getFilePathInLocation() {
    return path.dirname(this.pathToFile.replace(this.media.location.path, ''))
  }

  getFileName() {
    return path.basename(this.pathToFile)
  }

  async getFileType() {
    let ext = path.extname(this.pathToFile).toLocaleLowerCase();
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
    // let date = this.fileMetadata.dateTimeOriginal
    // if (!date) { //Store incorrect date of media that has no exif taken at date time
    //   date = Fs.statSync(this.pathToFile).mtime
    // }
    // return date;
    return this.fileMetadata.dateTimeOriginal;
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
    return fs.statSync(this.pathToFile).size;
  }

  getCheckSum(): Promise<string> {
    return new Promise(resolve => {
      fs.readFile(this.pathToFile, function (err: NodeJS.ErrnoException | null, data: Buffer) {
        resolve(checksum(data))
      })
    })
  }

}
