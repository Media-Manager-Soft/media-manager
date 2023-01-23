import {Location} from "../Entities/Location";
import {Media} from "../Entities/Media";
import {Thumbnail} from "../Entities/Thumbnail";
import {LocationResource} from "../Resources/LocationResource";

export class LocationController {
  static dispatch(action: string, data: any) {
    // @ts-ignore
    return this[action](data);
  }

  static async get() {
    return LocationResource.collection(await Location.find());
  }

  static async store(data: any) {
    let location = new Location;
    location.path = data.path;
    location.name = data.name;
    await location.save();
    location.service().syncFiles(data.generateThumbnails);
  }

  static async update(data: any) {
    let loc = await Location.findOne(data.locationId);
    loc.name = data.name;
    loc.save();
  }

  static async import(data: any) {
    const loc = await Location.findOne(data.locationId)
    loc?.service().importFiles(data.path, parseInt(data.locationId), data.action, data.generateThumbnails)
  }

  static async sync(data: any) {
    const loc = await Location.findOne(data.locationId);
    loc?.service().syncFiles(data.regenerateThumbs).then(() => {
      if (data.removeMissing) {
        loc?.service().removeIfNotExists()
      }
    });
  }

  static async delete(data: any) {
    await Thumbnail.delete({locationId: data.locationId})
    await Media.delete({location: data.locationId})
    await Location.delete({id: data.locationId});
  }



}
