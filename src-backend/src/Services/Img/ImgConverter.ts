import {Media} from "../../Entities/Media";

const sharp = require('sharp');

export class ImgConverter {
  public data: any;

  static setData(data: any) {
    const t = new this;
    t.data = sharp(data)
    return t;
  }

  toBuffer() {
    return this.data.toBuffer();
  }

  resize(width: number) {
    this.data.resize(width)
    return this;
  }

  resizeToThumb() {
    this.data.resize(Media.THUMB_WIDTH)
    return this;
  }

  toJpg(options: object) {
    this.data.jpeg(options);
    return this;
  }

  rotate(deg: number | undefined) {
    if (deg) {
      this.data.rotate(deg)
    }
    return this;
  }
}
