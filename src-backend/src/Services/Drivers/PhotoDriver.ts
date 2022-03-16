import { promisify } from "util";
import * as fs from "fs";
import { ExifTool } from "../Exif/ExifTool";
import { ImgConverter } from "../Img/ImgConverter";

const convert = require('heic-convert');

export class PhotoDriver {
  static async toBuffer(pathToFile: string) {
    let buffer;
    try {
      buffer = await this.standardJpg(pathToFile)
    } catch (e) {
      console.error(e)
    }

    if (!buffer) {
      try {
        buffer = await this.brokenJpg(pathToFile)
      } catch (e) {
        console.error(e)
      }
    }

    if (!buffer) {
      try {
        buffer = await this.heic(pathToFile)
      } catch (e) {
        console.error(e)
      }
    }
    return buffer;
  }

  protected static async standardJpg(pathToFile: string) {
    return await ImgConverter.setData(pathToFile).toBuffer()
  }

  protected static async brokenJpg(pathToFile: string) {
    return await ExifTool.extractAsBufferUsingDcraw(pathToFile);
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

