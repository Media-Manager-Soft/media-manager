import { IMetadata } from "./IMetadata";
import sizeOf from "image-size";

const exiftool = require("exiftool-vendored").exiftool

export class PhotoMetadataService implements IMetadata {
  protected metadata: any;
  protected pathToFile: string;

  async getMetadata(pathToFile: string) {
    this.pathToFile = pathToFile;
    this.metadata = await exiftool.read(pathToFile)
    return this;
  }

  get model() {
    return this.metadata.Model;
  }

  get make() {
    return this.metadata.Make;
  }

  get imageHeight() {
    let height = this.metadata.ImageHeight ?? this.metadata.ExifImageHeight;
    if (!height) {
      height = sizeOf(this.pathToFile).height;
    }
    return height;
  }

  get imageWidth() {
    let width = this.metadata.ImageWidth ?? this.metadata.ExifImageWidth;
    if (!width) {
      width = sizeOf(this.pathToFile).width;
    }
    return width;
  }

  get dateTimeOriginal() {
    return this.metadata.DateTimeOriginal;
  }

  get latitude() {
    return this.metadata.GPSLatitude
  }

  get longitude() {
    return this.metadata.GPSLongitude
  }

  get orientation() {
    return this.metadata.Orientation;
  }

}
