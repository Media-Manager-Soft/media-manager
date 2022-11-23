import {Media} from "../Entities/Media";

const fs = require('fs')

export class MediaActionsController {
  static dispatch(action: string, data: any) {
    // @ts-ignore
    return this[action](data);
  }

  static async deleteRejected(data: any) {
    let media = await Media.createQueryBuilder('m')
      .leftJoinAndSelect("m.location", "location")
      .where("locationId IN(:...ids)", {ids: data.locationsIds})
      .andWhere('flag = -1')
      .getMany()

    media.forEach((item: Media) => {
      try {
        fs.unlinkSync(item.getPathToFile())
      } catch (e) {
        console.error(e)
      }
      item.removeWithThumb();
    })
  }
}
