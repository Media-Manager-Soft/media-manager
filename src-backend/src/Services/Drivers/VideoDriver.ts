import { PathHelper } from "../../Helpers/helpers";
import * as fs from "fs";
import { ImgConverter } from "../Img/ImgConverter";
import { Media } from "../../Entities/Media";

const {v4: uuidv4} = require('uuid');

export class VideoDriver {
  static async toBuffer(pathToFile: string) {
    const folderId = uuidv4()
    await this.storeThumbToTemp(pathToFile, folderId);
    let files = fs.readdirSync(PathHelper.getTempPath(folderId))
    const buffer = await ImgConverter.setData(PathHelper.getTempPath(folderId, files[0])).toBuffer()
    PathHelper.deleteTemp(folderId);
    return buffer;
  }


  protected static async storeThumbToTemp(pathToFile: string, id: string) {
    const pathToTemp = PathHelper.getTempPath(id);
    PathHelper.ensurePathExists(pathToTemp)

    return new Promise((resolve, reject) => {

      const ffmpeg = require("../../plugins/ffmpeg");

      if (!fs.existsSync(pathToTemp)) { // Prevent render missing file
        return;
      }

      ffmpeg(pathToFile)
        .screenshots({
          timestamps: ['30%'],
          filename: '%s.jpg',
          folder: pathToTemp,
          size: Media.THUMB_WIDTH + 'x?'
        })
        .on('end', function (stdout: any, stderr: any) {
          resolve(true);
        })
        .on('error', function (stdout: any, stderr: any) {
          console.error('ffmpeg failed')
          reject(true);
        });
    });
  }

}
