import { PathHelper } from "../../Helpers/helpers";
import * as fs from "fs";
import { ImgConverter } from "../Img/ImgConverter";

var path = require('path');
const {v4: uuidv4} = require('uuid');
const {Worker} = require("worker_threads");

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

}
