import { IConverter } from "./IConverter";
import { Media } from "../../Entities/Media";
import * as fs from "fs";
import { PhotoConverter } from "./PhotoConverter";
import { PhotoRawDriver } from "../Drivers/PhotoRawDriver";

const sharp = require('sharp');

export class PhotoRawConverter implements IConverter {
  media: Media;

  constructor(media: Media) {
    this.media = media
  }

  thumb(): Promise<any> {
    let bufferPrev = PhotoRawDriver.toBuffer(this.media, {extractThumbnail: true})
    return sharp(bufferPrev).resize(Media.THUMB_WIDTH).toBuffer();
  }

  full(): Promise<any> | string {
    let bufferPrev = PhotoRawDriver.toBuffer(this.media, {extractThumbnail: true})
    return sharp(bufferPrev).toBuffer();
  }

}
