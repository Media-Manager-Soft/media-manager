import { Media } from "../../Entities/Media";
import * as child_process from "child_process";
import { ExifTool } from "../Exif/ExifTool";
import { ImgConverter } from "../Img/ImgConverter";

export class PhotoRawDriver {

  static async toBufferAsProcess(media: Media, options: any = {}) {
    const path = __dirname + '/../../processes/rawToBuffer.js';
    // @ts-ignore
    const a = child_process.fork(path, [media.getPathToFile()], {serialization: 'advanced'});

    return new Promise(resolve => {
      a.on('message', function (message) {
        resolve(message as Uint8Array);
        a.kill()
      });
    })
  }

  static async toBuffer(media: Media) {
    return await ExifTool.extractAsBuffer(media.getPathToFile());
  }
}
