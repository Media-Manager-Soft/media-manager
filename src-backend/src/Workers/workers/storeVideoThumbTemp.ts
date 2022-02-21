import { Media } from "../../Entities/Media";

const {workerData} = require("worker_threads");

storeVideoThumbTemp(workerData.pathToFile, workerData.pathToTemp)

function storeVideoThumbTemp(pathToFile: string, pathToTemp: string) {
  const ffmpeg = require("../../plugins/ffmpeg");
  try {

    ffmpeg(pathToFile)
      .screenshots({
        timestamps: ['30%'],
        filename: '%s.jpg',
        folder: pathToTemp,
        size: Media.THUMB_WIDTH + 'x?'
      });
  } catch (e) {
    console.error(e)
  }
}
