import { Media } from "../../../Entities/Media";
import { Location } from "../../../Entities/Location";
import exifr from 'exifr'

const path = require('path');

export class MetadataService {
  constructor(private media: Media) {
  }

  protected exif: any;

  public async discoverMetadata(pathToFile: string, location: Location) {
    this.basicData(location, pathToFile);
    await this.discoverExif()
  }

  public basicData(location: Location, pathToFile: string) {
    this.media.location = location;
    this.media.path = path.dirname(pathToFile.replace(location.path, ''));
    this.media.type = 'photo';
    this.media.filename = path.basename(pathToFile);
  }

  public async discoverExif() {
    const exif = await this.readExif();
    this.media.cameraModel = exif.Model;
    this.media.camera = exif.Make;
    this.media.height = parseInt(exif.ImageWidth);
    this.media.width = parseInt(exif.ImageHeight);
    this.media.takenAt = exif.DateTimeOriginal;
  }

  public readExif() {
    return exifr.parse(this.media.getPathToFile());
  }

}
