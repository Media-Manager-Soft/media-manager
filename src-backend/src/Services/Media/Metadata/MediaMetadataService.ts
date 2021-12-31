import exifr from "exifr";
import { Thumbnail } from "../../../Entities/Thumbnail";
import { MediaConverterService } from "../../MediaConverterService";
import { MediaExtensionTypes } from "../../../Enums/MediaType";
import { Location } from "../../../Entities/Location";
import { Media } from "../../../Entities/Media";

const path = require('path');
const sizeOf = require('image-size');

export class MediaMetadataService {
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
    this.exif = await exifr.parse(this.pathToFile);
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
    return this.exif.DateTimeOriginal
  }

  getLatitude() {
    return this.exif.latitude
  }

  getLongitude() {
    return this.exif.longitude
  }

  async getOrientation() {
    return await exifr.orientation(this.pathToFile);
  }

  public async storeThumb() {
    try {
      if (!this.media.hasThumb()) {
        let thumb: Thumbnail = new Thumbnail()
        let converter = new MediaConverterService(this.media)
        thumb.thumbnail = await converter.generateThumb();
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
