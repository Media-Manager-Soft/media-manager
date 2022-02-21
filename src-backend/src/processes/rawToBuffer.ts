import { ExifTool } from "../Services/Exif/ExifTool";

const sharp = require('sharp');

const pathToRawFile = process.argv.slice(2)[0];

new Promise(async resolve => {
  const res = await ExifTool.extractAsBuffer(pathToRawFile);
  resolve(sharp(res).toBuffer())
}).then((res) => {
// @ts-ignore
  process.send(res)
})
