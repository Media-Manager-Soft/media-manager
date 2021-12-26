import "reflect-metadata";
import { Location } from "../../Entities/Location";
import { DBConnection } from "../../Database/DBConnection";
import { Media } from "../../Entities/Media";

const workerpool = require('workerpool');


async function discover(workerId: string, locationId: any, paths: any) {
  await DBConnection.createConnection()
  const location = await Location.findOne(locationId);
  location?.service().discoverFiles()

  for (let i = 0; i < paths.length; i++) {
    let media = new Media();
    try {
      await media.metadataService.discoverMetadata(paths[i], location);
      await media.save();

      workerpool.workerEmit({
        workerName: workerId,
        processing: true,
        data: {
          title: media.filename,
          total: paths.length,
          current: i + 1
        }
      } as IFrontNotificationWorker);

    } catch (e) {
      //TODO: emit errors during discovering
      console.error(e);
    }
  }

  workerpool.workerEmit({
    workerName: workerId,
    processing: false,
  } as IFrontNotificationWorker);
}

workerpool.worker({
  discover: discover
});
