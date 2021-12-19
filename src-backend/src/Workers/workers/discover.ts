import "reflect-metadata";
import { Location } from "../../Entities/Location";
import { DBConnection } from "../../Database/DBConnection";
import { Media } from "../../Entities/Media";

const workerpool = require('workerpool');


async function discover(locationId: any, paths: any) {
  await DBConnection.createConnection()
  const location = await Location.findOne(locationId);
  location?.service().discoverFiles()

  for (let i = 0; i < paths.length; i++) {
    let media = new Media();
    try {
      await media.metadataService.discoverMetadata(paths[i], location);
      await media.save();
      workerpool.workerEmit({
        title: media.filename,
        total: paths.length,
        current: i
      });
    } catch (e) {
      console.error(e);
    }
  }
}


workerpool.worker({
  discover: discover
});
