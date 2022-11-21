import { ExifTool } from "../Services/Exif/ExifTool";
import { ImgConverter } from "../Services/Img/ImgConverter";


const pathToRawFile = process.argv.slice(2)[0];

new Promise(async resolve => {
  const res = await ExifTool.extractAsBuffer(pathToRawFile);
  resolve(ImgConverter.setData(res).toBuffer());
}).then((res) => {
// @ts-ignore
  process.send(res)
})
