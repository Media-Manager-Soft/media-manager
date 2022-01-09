import exifr from "exifr";
import { IMetadata } from "./IMetadata";

export class ExifService implements IMetadata{
  private exif: any;

  async getExifForFile(pathToFile: string) {
    // let options = {pick: ['ExposureTime', 'FNumber', 'ISO']};
    //
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
    return this.exif.ImageHeight ?? this.exif.ExifImageHeight;
  }

  get imageWidth() {
    return this.exif.ImageWidth ?? this.exif.ExifImageWidth;
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
