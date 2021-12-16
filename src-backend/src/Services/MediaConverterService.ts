import { Media } from "../Entities/Media";
import * as fs from "fs";

const dcraw = require('dcraw');

const sharp = require('sharp');

export class MediaConverterService {

  public THUMB_WIDTH: number = 200;

  constructor(private media: Media) {
  }

  public generateThumb() {
    let fnName = this.media.type.toString() + 'Thumb';
    // @ts-ignore
    return this[fnName]();
  }

  async photoThumb() {
    try {
      return await sharp(this.media.getPathToFile()).resize(this.THUMB_WIDTH).toBuffer()
    } catch (e) {
      return dcraw(fs.readFileSync(this.media.getPathToFile()), {extractThumbnail: true})
    }
  }

  async photoRawThumb() {
    return dcraw(fs.readFileSync(this.media.getPathToFile()), {extractThumbnail: true})
  }

  async photoMovieThumb() {
  }
}
