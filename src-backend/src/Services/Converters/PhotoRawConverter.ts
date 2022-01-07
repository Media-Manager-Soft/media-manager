import { IConverter } from "./IConverter";
import { Media } from "../../Entities/Media";
import * as fs from "fs";
const dcraw = require('dcraw');
const sharp = require('sharp');

export class PhotoRawConverter implements IConverter {
  media: Media;
  thumb(): Promise<any> {
    let bufferPrev = dcraw(fs.readFileSync(this.media.getPathToFile()), {extractThumbnail: true})
    return sharp(bufferPrev).resize(Media.THUMB_WIDTH).toBuffer();
  }

  constructor(media: Media) {
    this.media = media
  }
}
