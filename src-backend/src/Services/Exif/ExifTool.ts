import { PathHelper } from "../../Helpers/helpers";
import * as path from "path";
import * as fs from "fs";

const {v4: uuidv4} = require('uuid');
const exiftool = require("exiftool-vendored").exiftool
const sharp = require('sharp');

export class ExifTool {
  static async extractAsBuffer(filePath: string) {
    let folderId = uuidv4();
    const tmpPath = PathHelper.getTempPath(folderId)
    await exiftool.extractPreview(filePath, path.join(tmpPath, 'img.jpg'))

    let file = fs.readFileSync(path.join(tmpPath, 'img.jpg'))
    const buffer = await sharp(file).toBuffer()
    PathHelper.deleteTemp(tmpPath);
    return buffer;
  }

  static async extractAsBufferUsingDcraw(filePath: string) {
    const dcraw = require('dcraw');
    return await dcraw(fs.readFileSync(filePath), {extractThumbnail: true})
  }
}
