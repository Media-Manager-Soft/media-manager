import { Media } from "../../Entities/Media";
import { IConverter } from "./IConverter";
import { PhotoDriver } from "../Drivers/PhotoDriver";
import { ImgConverter } from "../Img/ImgConverter";

export class PhotoConverter implements IConverter {
  media: Media;

  constructor(media: Media) {
    this.media = media
  }

  async retrieveThumb(): Promise<any> {
    let buffer = await PhotoDriver.toBuffer(this.media.getPathToFile())
    return ImgConverter.setData(buffer).toBuffer();
  }

  async full() {
    return this.media.getPathToFile();
  }
}

