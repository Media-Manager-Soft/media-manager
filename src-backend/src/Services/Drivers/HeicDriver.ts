import {promisify} from "util";
import * as fs from "fs";

const convert = require('heic-convert');

export class HeicDriver {

  static async toBuffer(pathToFile: string) {
    try {
      return await this.heic(pathToFile);
    } catch (e) {
      console.error(e)
    }
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
