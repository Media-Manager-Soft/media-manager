import { Media } from "../Entities/Media";
import * as fs from "fs";

const dcraw = require('dcraw');
import exifr from "exifr";
import { promisify } from "util";

const convert = require('heic-convert');
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
    let buffer;
    try {
      buffer = await sharp(this.media.getPathToFile()).resize(this.THUMB_WIDTH).toBuffer()
    } catch (e) {
    }

    if (!buffer) {
      try {
        let bufferPrev = dcraw(fs.readFileSync(this.media.getPathToFile()), {extractThumbnail: true})
        buffer = await sharp(bufferPrev).resize(this.THUMB_WIDTH).toBuffer();
      } catch (e) {
      }
    }

    if (!buffer) {
      try {
        const inputBuffer = await promisify(fs.readFile)(this.media.getPathToFile());
        const bufferPrev = await convert({
          buffer: inputBuffer, // the HEIC file buffer
          format: 'JPEG',      // output format
          quality: 1,          // the jpeg compression quality, between 0 and 1
        });
        buffer = await sharp(bufferPrev).resize(this.THUMB_WIDTH).toBuffer();
      } catch (e) {
      }
    }

    return buffer;
  }

  async photoRawThumb() {
    return dcraw(fs.readFileSync(this.media.getPathToFile()), {extractThumbnail: true})
  }

  async photoMovieThumb() {
  }
}
