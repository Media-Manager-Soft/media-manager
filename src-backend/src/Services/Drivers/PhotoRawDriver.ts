import * as fs from "fs";
import { Media } from "../../Entities/Media";
import * as child_process from "child_process";

const dcraw = require('dcraw');

export class PhotoRawDriver {

  static toBuffer(media: Media, options: any = {}) {
    return dcraw(fs.readFileSync(media.getPathToFile()), options)
  }

  static async toBufferAsProcess(media: Media, options: any = {}) {
    const path = __dirname + '/../../processes/rawToBuffer.js';
    // @ts-ignore
    const a = child_process.fork(path, [media.getPathToFile()], {serialization: 'advanced'});

    return new Promise(resolve => {
      a.on('message', function (message) {
        resolve(message as Uint8Array);
      });
    })
  }
}
