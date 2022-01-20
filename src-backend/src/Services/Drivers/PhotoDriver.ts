import { promisify } from "util";
import * as fs from "fs";

const dcraw = require('dcraw');
const convert = require('heic-convert');
const sharp = require('sharp');

export class PhotoDriver {
  static async toBuffer(pathToFile: string) {
    let buffer;
    try {
      buffer = await this.standardJpg(pathToFile)
    } catch (e) {
    }

    if (!buffer) {
      try {
        buffer = await this.brokenJpg(pathToFile)
      } catch (e) {
      }
    }

    if (!buffer) {
      try {
        buffer = await this.heic(pathToFile)
      } catch (e) {
      }
    }
    return buffer;
  }

  protected static async standardJpg(pathToFile: string) {
    return await sharp(pathToFile).toBuffer()
  }

  protected static async brokenJpg(pathToFile: string) {
    return dcraw(fs.readFileSync(pathToFile), {extractThumbnail: true})
  }

  protected static async heic(pathToFile: string) {
    const inputBuffer = await promisify(fs.readFile)(pathToFile);
    return await convert({
      buffer: inputBuffer, // the HEIC file buffer
      format: 'JPEG',      // output format
      quality: 1,          // the jpeg compression quality, between 0 and 1
    });
  }
}
