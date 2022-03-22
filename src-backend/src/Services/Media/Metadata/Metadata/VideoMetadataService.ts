import { IMetadata } from "./IMetadata";

const ffmpeg = require('../../../../plugins/ffmpeg');
const exiftool = require("exiftool-vendored").exiftool

export class VideoMetadataService implements IMetadata{
  private exifMetadata: any;
  protected metadata: any;
  protected pathToFile: string;

  async getMetadata(pathToFile: string) {
    this.pathToFile = pathToFile;
    this.exifMetadata = await exiftool.read(pathToFile)
    this.metadata = await this.readMetadata(pathToFile)
    return this;
  }

  readMetadata(pathToFile: string) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(pathToFile, (err: any, metadata: any) => {
        if (err) {
          reject(err);
        }
        resolve(metadata);
      })
    });
  }

  get dateTimeOriginal(): Date | null {
    return this.metadata?.format?.tags?.creation_time;
  }

  get imageHeight(): string {
    return this.getVideoStream()?.width
  }

  get imageWidth(): string {
    return this.getVideoStream()?.height
  }

  get latitude(): string {
    let lat = this.metadata?.format?.tags?.location;
    return lat?.replace('/', '').split('+')[1];
  }

  get longitude(): string {
    let long = this.metadata?.format?.tags?.location;
    return long?.replace('/', '').split('+')[2];
  }

  get model() {
    return this.exifMetadata.Model;
  }

  get make() {
    return this.exifMetadata.Make;
  }

  get orientation(): number {
    let data = this.getVideoStream();
    return data?.rotation;
  }


  protected getVideoStream() {
    if (this.metadata?.streams) {
      return this.metadata.streams?.find((item: any) => {
        return item.codec_type === 'video';
      })
    }
  }
}
