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

      let result = await media.mediaService.shouldBeImported();

      if (!!result) { // result - Media from db (if exists)
        Media.UPDATABLE_COLUMNS.forEach((column) => {
          // @ts-ignore
          result[column] = media[column];
        })
        media = result;
      }

      await media.save();

      if (message.data.regenerateThumbs === true) {
        await media.mediaService.storeThumb();
      }

      notify(message.id, true, media.filename, message.data.paths.length, i + 1)

    } catch (e: any) {
      // TODO: emit errors during discovering
      console.error(`${e.message}: ${message.data.paths[i]}`);
    }

  }
  notify(message.id, false, 'Finish!', 1, 1)

});

function notify(workerName:string, processing: boolean, title:string, total:number, current:number) {
  let msg = {
    job: 'Syncing',
    workerName: workerName,
    processing: processing,
    data: {
      title: title,
      total: total,
      current: current
    }
  } as IFrontNotificationWorker

  // @ts-ignore
  process.send(msg);
}

