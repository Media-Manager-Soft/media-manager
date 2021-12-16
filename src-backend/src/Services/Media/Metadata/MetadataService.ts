import { Media } from "../../../Entities/Media";
import { Location } from "../../../Entities/Location";
import exifr from 'exifr'
import { MediaExtensionTypes } from "../../../Enums/MediaType";
import { Thumbnail } from "../../../Entities/Thumbnail";
import { MediaConverterService } from "../../MediaConverterService";

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
    let ext = path.extname(this.media.filename).toLocaleLowerCase();
    let type = MediaExtensionTypes[ext];
    if (type === undefined) {
      throw new Error('Unsupported extension: ' + ext)
    }
    return type;
  }

  public async discoverExif() {
    const exif = await this.getExifFromFile();
    this.media.cameraModel = exif.Model;
    this.media.camera = exif.Make;
    this.media.height = await this.discoverDimension('ImageHeight');
    this.media.width = await this.discoverDimension('ImageWidth');
    this.media.latitude = exif.latitude;
    this.media.longitude = exif.longitude;
    this.media.orientation = await exifr.orientation(this.media.getPathToFile());
  }

  public async discoverDimension(field: string) {
    const exif = await this.getExifFromFile();
    return parseInt(exif[field]);
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

}
