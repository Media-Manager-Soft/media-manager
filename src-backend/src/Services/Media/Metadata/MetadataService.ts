import { Media } from "../../../Entities/Media";
import { Location } from "../../../Entities/Location";
import exifr from 'exifr'
import { ThumbnailService } from "./ThumbnailService";
import { MediaExtensionTypes } from "../../../Enums/MediaType";

const path = require('path');

export class MetadataService {
  constructor(private media: Media) {
  }

  protected exif: any = null;

  public async discoverMetadata(pathToFile: string, location: Location) {
    this.basicData(location, pathToFile);
    await this.discoverExif();
    await this.discoverTakenAtDate();
    await this.storeThumb();
  }

  public basicData(location: Location, pathToFile: string) {
    this.media.location = location;
    this.media.path = path.dirname(pathToFile.replace(location.path, ''));
    this.media.filename = path.basename(pathToFile);
    this.media.type = this.discoverType();
  }

  public discoverType() {
    return MediaExtensionTypes[path.extname(this.media.filename)];
  }

  public async discoverExif() {
    const exif = await this.getExifFromFile();
    this.media.cameraModel = exif.Model;
    this.media.camera = exif.Make;
    this.media.height = parseInt(exif.ImageWidth);
    this.media.width = parseInt(exif.ImageHeight);
  }


  public async discoverTakenAtDate() {
    const exif = await this.getExifFromFile();
    this.media.takenAt = exif.DateTimeOriginal;
  }

  public async getExifFromFile() {
    if (this.exif === null) {
      this.exif = await exifr.parse(this.media.getPathToFile());
    }
    return this.exif
  }

  public async storeThumb() {
    await ThumbnailService.storeThumbnail(this.media);
  }

}
