import { IConverter } from "./IConverter";
import { Media } from "../../Entities/Media";
import { PhotoRawDriver } from "../Drivers/PhotoRawDriver";
import * as fs from "fs";

const dcraw = require('dcraw');
const sharp = require('sharp');

export class PhotoRawConverter implements IConverter {
  media: Media;

  constructor(media: Media) {
    this.media = media
  }

  async thumb(): Promise<any> {
    let bufferPrev = await PhotoRawDriver.toBufferAsProcess(this.media, {extractThumbnail: true})
    return sharp(bufferPrev).resize(Media.THUMB_WIDTH).toBuffer();
  }

  async full(): Promise<any> {
    let bufferPrev = await PhotoRawDriver.toBufferAsProcess(this.media, {extractThumbnail: true})
    return sharp(bufferPrev).toBuffer();
  }

}
