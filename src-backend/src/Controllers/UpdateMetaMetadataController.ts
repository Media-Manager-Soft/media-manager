import { Media } from "../Entities/Media";

export class UpdateMetaMetadataController {
  static async update(mediaId: number, data: keyof Media) {
    await Media.createQueryBuilder().where({id: mediaId}).update(data).execute()
    return await Media.findOne(mediaId);
  }
}
