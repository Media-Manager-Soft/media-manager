import * as fs from "fs";

export class PathHelper{
 public static ensurePathExists(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }
  }
}
