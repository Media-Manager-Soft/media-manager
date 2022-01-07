import { Thumbnail } from "../../../Entities/Thumbnail";
import { MediaExtensionTypes } from "../../../Enums/MediaType";
import { Location } from "../../../Entities/Location";
import { Media } from "../../../Entities/Media";
import { ExifService } from "./ExifService";
import * as Fs from "fs";

const path = require('path');
const sizeOf = require('image-size');

export class MetadataService {
  private exif: any;
  private pathToFile: string;
  private media: Media;

  async setFile(media: Media, pathToFile: string, location: Location) {
    this.media = media;
    this.media.location = location;
    this.pathToFile = pathToFile;
    await this.getExif();
  }

  async getExif() {
    this.exif = await new ExifService().setFile(this.pathToFile);
  }

  getFilePathInLocation() {
    return path.dirname(this.pathToFile.replace(this.media.location.path, ''))
  }

  getFileName() {
    return path.basename(this.pathToFile)
  }

  getFileType() {
    let ext = path.extname(this.pathToFile).toLocaleLowerCase();
    let type = MediaExtensionTypes[ext];
    if (type === undefined) {
      throw new Error('Unsupported extension: ' + ext)
    }
    return type;
  }

  getCameraModel() {
    return this.exif.Model;
  }

  getCameraManufacturer() {
    return this.exif.Make;
  }

  getHeight() {
    let height = parseInt(this.exif.ImageHeight);
    if (!height) {
      height = sizeOf(this.pathToFile).height;
    }
    return height;
  }

  getWidth() {
    let width = parseInt(this.exif.ImageWidth);
    if (!width) {
      width = sizeOf(this.pathToFile).width;
    }
    return width;
  }

  getTakenAt() {
    let date = this.exif.DateTimeOriginal
    if (!date) {
      date = Fs.statSync(this.pathToFile).mtime
    }
    return date;
  }

  getLatitude() {
    return this.exif.latitude
  }

  getLongitude() {
    return this.exif.longitude
  }

  getOrientation() {
    return this.exif.orientation
  }

  public async storeThumb() {
    try {
      if (!this.media.hasThumb()) {
        let thumb: Thumbnail = new Thumbnail()
        thumb.thumbnail = await this.media.converter().thumb()
        await thumb.save();
        this.media.thumbnail = thumb;
      }
    } catch (e) {
      console.error(e)
    }
  }


  public discoverType() {
    let ext = path.extname(this.media.filename).toLocaleLowerCase();
    let type = MediaExtensionTypes[ext];
    if (type === undefined) {
      throw new Error('Unsupported extension: ' + ext)
    }
    return type;
  }

}
