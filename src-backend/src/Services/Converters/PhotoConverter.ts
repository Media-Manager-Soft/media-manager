import { Media } from "../../Entities/Media";
import { IConverter } from "./IConverter";
import { PhotoDriver } from "../Drivers/PhotoDriver";
const sharp = require('sharp');

export class PhotoConverter implements IConverter {
  media: Media;

  constructor(media: Media) {
    this.media = media
  }

  async thumb(): Promise<any> {
    let buffer = await PhotoDriver.toBuffer(this.media.getPathToFile())
    return sharp(buffer).resize(Media.THUMB_WIDTH).toBuffer()
  }
}

