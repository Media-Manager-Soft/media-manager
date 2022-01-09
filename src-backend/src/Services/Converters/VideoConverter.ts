import { IConverter } from "./IConverter";
import { Media } from "../../Entities/Media";


export class VideoConverter implements IConverter {
  media: Media;


  constructor(media: Media) {
    this.media = media
  }

  thumb(): Promise<any> {

    return Promise.resolve(undefined);
  }

}
