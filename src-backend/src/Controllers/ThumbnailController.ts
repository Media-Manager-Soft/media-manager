import { Thumbnail } from "../Entities/Thumbnail";
import { Media } from "../Entities/Media";

export class ThumbnailController {

  static async getThumb(mediaId: number) {
    // console.log(mediaId)
    let thumb: any = await Thumbnail.findOne({mediaId: mediaId});
    if (!thumb) {
      thumb = await new Promise(resolve => {
        resolve(this.storeThumb(mediaId));
      })
    }
    return thumb?.thumbnail

  }

  static storeThumb(mediaId: number) {
    return new Promise(async resolve => {
      let media = await Media.findOne(mediaId, {relations: ['location']}) // TODO: Use select
      try {
        const thumb = await media?.mediaService.storeThumb();
        resolve(thumb);
      } catch (e) {
        console.error(e)
      }
    })
  }
}
