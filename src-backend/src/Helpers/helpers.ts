import * as fs from "fs";
import { APP_DATA } from "../configs";

var path = require('path');

export class PathHelper {
  public static ensurePathExists(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }
  }

  public static getTempPath(folder: string = '', fileName: string | null = null) {
    let filePath = path.join(path.join(APP_DATA, 'tmp'), folder);
    if (fileName) {
      filePath = path.join(filePath, fileName)
    }
    return filePath;
  }

  public static deleteTemp(folder: string = '') {
    if (fs.existsSync(this.getTempPath(folder))) {
      fs.rmdirSync(this.getTempPath(folder), {recursive: true});
    }
  }
}
