import * as fs from "fs";

const dcraw = require('dcraw');
const sharp = require('sharp');

const pathToRawFile = process.argv.slice(2)[0];
const res = dcraw(fs.readFileSync(pathToRawFile), {extractThumbnail: true})
new Promise(resolve => {
  resolve(sharp(res).toBuffer())
}).then((res) => {
// @ts-ignore
  process.send(res)
})
