import exifr from "exifr";

export class ExifService {
  private exif: any;

  async setFile(pathToFile: string) {
    let options = {pick: ['ExposureTime', 'FNumber', 'ISO']};
    //
    this.exif = await exifr.parse(pathToFile, {translateValues: false})
    return this;
  }

  get Model() {
    return this.exif.Model;
  }

  get Make() {
    return this.exif.Make;
  }

  get ImageHeight() {
    return this.exif.ImageHeight ?? this.exif.ExifImageHeight;
  }

  get ImageWidth() {
    return this.exif.ImageWidth ?? this.exif.ExifImageWidth;
  }

  get DateTimeOriginal() {
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
