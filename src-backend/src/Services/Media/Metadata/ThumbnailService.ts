import { Media } from "../../../Entities/Media";
import * as fs from "fs";

const sharp = require('sharp');


export class ThumbnailService {
  public static async storeThumbnail(media: Media) {
    try {
      media.thumbnail = await sharp(media.getPathToFile()).resize(320).toBuffer();
    } catch (e) {
      console.error(e)
    }
  }

  protected static ensurePathExists(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }
  }
}
