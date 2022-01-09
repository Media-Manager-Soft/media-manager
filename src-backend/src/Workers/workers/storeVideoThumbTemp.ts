const {workerData} = require("worker_threads");

storeVideoThumbTemp(workerData.pathToFile, workerData.pathToTemp)

function storeVideoThumbTemp(pathToFile: string, pathToTemp: string) {
  const ffmpeg = require("../../plugins/ffmpeg");

  ffmpeg(pathToFile)
    .screenshots({
      timestamps: ['30%', '40%', '60%'],
      filename: '%s.webp',
      folder: pathToTemp,
      // size: Media.THUMB_WIDTH + 'x?'
    });
}
