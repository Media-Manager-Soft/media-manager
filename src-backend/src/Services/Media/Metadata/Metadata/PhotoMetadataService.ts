import { IMetadata } from "./IMetadata";
import sizeOf from "image-size";

const exiftool = require("exiftool-vendored").exiftool

export class PhotoMetadataService implements IMetadata {
  private exif: any;
  private pathToFile: string;

  async getExifForFile(pathToFile: string) {
    this.pathToFile = pathToFile;
    this.exif = await exiftool.read(pathToFile)
    return this;
  }

  get model() {
    return this.exif.Model;
  }

  get make() {
    return this.exif.Make;
  }

  get imageHeight() {
    let height = this.exif.ImageHeight ?? this.exif.ExifImageHeight;
    if (!height) {
      height = sizeOf(this.pathToFile).height;
    }
    return height;
  }

  get imageWidth() {
    let width = this.exif.ImageWidth ?? this.exif.ExifImageWidth;
    if (!width) {
      width = sizeOf(this.pathToFile).width;
    }
    return width;
  }

  get dateTimeOriginal() {
    return this.exif.DateTimeOriginal;
  }

  get latitude() {
    return this.exif.GPSLatitude
  }

  get longitude() {
    return this.exif.GPSLongitude
  }

  get orientation() {
    return this.exif.Orientation;
  }

}
