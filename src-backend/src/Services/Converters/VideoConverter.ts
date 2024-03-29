import { IConverter } from "./IConverter";
import { Media } from "../../Entities/Media";
import { VideoDriver } from "../Drivers/VideoDriver";

export class VideoConverter implements IConverter {
  media: Media;

  constructor(media: Media) {
    this.media = media
  }

  retrieveThumb(): Promise<any> {
    return Promise.resolve(VideoDriver.toBuffer(this.media.getPathToFile()));
  }

  full(){
    return this.media.getPathToFile();
  }

}
