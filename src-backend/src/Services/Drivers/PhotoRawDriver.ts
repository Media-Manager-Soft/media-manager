import * as fs from "fs";
import { Media } from "../../Entities/Media";

const dcraw = require('dcraw');

export class PhotoRawDriver {
  static toBuffer(media: Media, options: any = {}) {
    return dcraw(fs.readFileSync(media.getPathToFile()), options)
  }
}
