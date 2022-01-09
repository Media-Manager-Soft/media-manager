import exifr from "exifr";
import { IMetadata } from "./IMetadata";
import sizeOf from "image-size";
export class PhotoMetadataService implements IMetadata{
  private exif: any;
  private pathToFile: string;

  async getExifForFile(pathToFile: string) {
    // let options = {pick: ['ExposureTime', 'FNumber', 'ISO']};
    this.pathToFile = pathToFile;
    this.exif = await exifr.parse(pathToFile, {translateValues: false})
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
    return this.exif.latitude
  }

  get longitude() {
    return this.exif.longitude
  }

  get orientation() {
    return this.exif.Orientation;
  }

}
