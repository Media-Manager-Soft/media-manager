import { Location } from "../../Entities/Location";
import { DBConnection } from "../../Database/DBConnection";
import { Media } from "../../Entities/Media";

process.on('message', async (message) => {

  await DBConnection.createConnection()
  const location = await Location.findOne(message.data.locationId);

  for (let i = 0; i < message.data.paths.length; i++) {
    let media = new Media();
    try {
      await media.mediaService.discoverMetadata(message.data.paths[i], location);
      await media.save();

      let msg = {
        workerName: message.id,
        processing: true,
        data: {
          title: media.filename,
          total: message.data.paths.length,
          current: i + 1
        }
      } as IFrontNotificationWorker

      // @ts-ignore
      process.send(msg);

    } catch (e) {
      // TODO: emit errors during discovering
      console.error(e);
    }

  }

});

