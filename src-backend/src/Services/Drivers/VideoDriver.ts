import { PathHelper } from "../../Helpers/helpers";
import * as fs from "fs";
import { APP_DATA } from "../../configs";

const sharp = require('sharp');
var path = require('path');
const {v4: uuidv4} = require('uuid');
const {Worker} = require("worker_threads");

export class VideoDriver {
  static async toBuffer(pathToFile: string) {
    const folderId = uuidv4()
    await this.storeThumbToTemp(pathToFile, folderId);
    let files = fs.readdirSync(this.getTempPath(folderId))
    const buffer = await sharp(this.getTempPath(folderId, files[0])).toBuffer()
    this.deleteTemp(folderId);
    return buffer;
  }

  protected static getTempPath(id: string, fileName: string | null = null) {
    let filePath = path.join(path.join(APP_DATA, 'tmp'), id);
    if (fileName) {
      filePath = path.join(filePath, fileName)
    }
    return filePath;
  }

  protected static async storeThumbToTemp(pathToFile: string, id: string) {
    const pathToTemp = this.getTempPath(id);
    PathHelper.ensurePathExists(pathToTemp)

    const worker = new Worker(
      path.resolve(__dirname, '../../Workers/workers/storeVideoThumbTemp.js'),
      {workerData: {pathToFile: pathToFile, pathToTemp: pathToTemp}}
    );

    return new Promise((resolve) => {
      worker.on("exit", () => {
        resolve(true);
      })
    });
  }

  protected static deleteTemp(folder: string) {
    fs.rmdirSync(this.getTempPath(folder), {recursive: true});
  }
}
