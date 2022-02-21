import { IConverter } from "./IConverter";
import { Media } from "../../Entities/Media";
import { PhotoRawDriver } from "../Drivers/PhotoRawDriver";
import { ImgConverter } from "../Img/ImgConverter";

export class PhotoRawConverter implements IConverter {
  media: Media;

  constructor(media: Media) {
    this.media = media
  }

  async retrieveThumb(): Promise<any> {
    return this.full();
  }

  async full(): Promise<any> {
    let bufferPrev = await PhotoRawDriver.toBufferAsProcess(this.media)
    return ImgConverter.setData(bufferPrev).toBuffer();
  }

}
