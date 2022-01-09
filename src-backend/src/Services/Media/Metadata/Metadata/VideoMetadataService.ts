import { IMetadata } from "./IMetadata";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";


export class VideoMetadataService implements IMetadata {

  async getMetadata4(pathToFile: string) {
    var ffprobe = require('ffprobe');

    ffprobe(pathToFile, { path: require('@ffprobe-installer/ffprobe').path }, function (err:any, info:any) {
      console.log(info);
    });
    return this;
  }

  async getMetadata(pathToFile: string) {
    const ffmpeg = require('fluent-ffmpeg')
    const ffprobe = require('@ffprobe-installer/ffprobe');

    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    const ffprobePath = require('@ffprobe-installer/ffprobe').path;

    const {v4: uuidv4} = require('uuid');

    // var proc = new ffmpeg(pathToFile)
    //   .setFfprobePath(ffprobePath)
    //   .setFfmpegPath(ffmpegPath)
    //   .takeScreenshots({
    //     count: 1,
    //     size: '320x240',
    //     filename: uuidv4() + '_thumbnail-at-%s-seconds.png',
    //     timemarks: [ '1' ] // number of seconds
    //   }, '/Users/tomekzmudzinski/Documents/Asd', function(err:any) {
    //     console.log('screenshots were saved')
    //   });

    //
    // const ffmpeg = require('fluent-ffmpeg')
    // const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    // const ffprobePath = require('@ffprobe-installer/ffprobe').path;
    //
    console.log(ffmpegPath)
    // console.log(ffprobePath)
    console.log(ffprobe.path)
    // ffmpeg.setFfmpegPath(ffmpegPath);
    // ffmpeg.setFfprobePath(ffprobe.path);
    //
    ffmpeg.setFfmpegPath(ffmpegPath.replace('app.asar', 'app.asar.unpacked'));
    ffmpeg.setFfprobePath(ffprobePath.replace('app.asar', 'app.asar.unpacked'));

    try {

      ffmpeg(pathToFile)
        .screenshots({
          timestamps: ['1'],
          filename: uuidv4() + '_____thumbnail-at-%s-seconds.png',
          folder: '/Users/tomekzmudzinski/Documents/Asd',
          size: '320x?'
        });

      ffmpeg.ffprobe(pathToFile, function(err:any, metadata:any) {
        console.log('asdsad')
        console.dir(metadata);
        console.error(err);
      });


    }catch (e) {
      console.log(e)
    }
    //
    return this;
  }

  get dateTimeOriginal(): Date | null {
    return null;
  }

  get imageHeight(): string {
    return "123"; //redad size of - not working on video files
  }

  get imageWidth(): string {
    return '1244';
  }

  get latitude(): string {
    return "";
  }

  get longitude(): string {
    return "";
  }

  get make(): string {
    return "";
  }

  get model(): string {
    return "";
  }

  get orientation(): number {
    return 0;
  }


}
