const ffmpeg = require('fluent-ffmpeg')

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

ffmpeg.setFfmpegPath(ffmpegPath.replace('app.asar', 'app.asar.unpacked'));
ffmpeg.setFfprobePath(ffprobePath.replace('app.asar', 'app.asar.unpacked'));

module.exports = ffmpeg;
