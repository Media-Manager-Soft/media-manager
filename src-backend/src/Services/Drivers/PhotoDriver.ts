import { ExifTool } from "../Exif/ExifTool";
import { ImgConverter } from "../Img/ImgConverter";

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

    return buffer;
  }

  protected static async standardJpg(pathToFile: string) {
    return await ImgConverter.setData(pathToFile).toBuffer()
  }

  protected static async brokenJpg(pathToFile: string) {
    return await ExifTool.extractAsBufferUsingDcraw(pathToFile);
  }

}

