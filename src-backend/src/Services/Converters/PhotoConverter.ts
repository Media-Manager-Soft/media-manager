import { Media } from "../../Entities/Media";
import { IConverter } from "./IConverter";
import { PhotoDriver } from "../Drivers/PhotoDriver";
const sharp = require('sharp');

export class PhotoConverter implements IConverter {
  media: Media;

  constructor(media: Media) {
    this.media = media
  }

  async retrieveThumb(): Promise<any> {
    let buffer = await PhotoDriver.toBuffer(this.media.getPathToFile())
    return sharp(buffer).toBuffer()
  }

  async full() {
    return this.media.getPathToFile();
  }
}

