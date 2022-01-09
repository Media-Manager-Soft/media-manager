import { IMetadata } from "./IMetadata";

const ffmpeg = require('../../../../plugins/ffmpeg');

export class VideoMetadataService implements IMetadata {
  private metadata: any;
  private pathToFile: string;

  async getMetadata(pathToFile: string) {
    this.pathToFile = pathToFile;
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
    let data = this.getVideoStream()
    return data?.width;
  }

  get imageWidth(): string {
    let data = this.getVideoStream()
    return data?.height;
  }

  get latitude(): string {
    let lat = this.metadata?.format?.tags?.location;
    return lat.replace('/', '').split('+')[1];
  }

  get longitude(): string {
    let long = this.metadata?.format?.tags?.location;
    return long.replace('/', '').split('+')[2];
  }

  get make(): string {
    return this.metadata?.format?.tags?.['com.apple.quicktime.make'];
  }

  get model(): string {
    return this.metadata?.format?.tags?.['com.apple.quicktime.model'];
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
