import {IConverter} from "./IConverter";
import {Media} from "../../Entities/Media";
import {ImgConverter} from "../Img/ImgConverter";
import {HeicDriver} from "../Drivers/HeicDriver";

export class HeicConverter implements IConverter {
  media: Media;

  constructor(media: Media) {
    this.media = media
  }

  async retrieveThumb(): Promise<any> {
    let buffer = await HeicDriver.toBuffer(this.media.getPathToFile())
    return ImgConverter.setData(buffer).toBuffer();
  }

  async full(): Promise<any> {
    return this.retrieveThumb();
  }
}
