import * as fs from "fs";
import { app } from "electron";

const path = require('path');

export class PathHelper {
  public static ensurePathExists(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }
  }

  public static getTempPath(folder: string = '', fileName: string | null = null) {
    let filePath = path.join(path.join(app.getPath('temp'), 'tmp'), folder);
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

  public static addSuffixForDuplicatedFile(fileName: string) {
    return path.basename(fileName, path.extname(fileName)) + ' [duplicate]' + path.extname(fileName);
  }
}
