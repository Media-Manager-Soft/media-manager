import {Location} from "../../Entities/Location";
import {DBConnection} from "../../Database/DBConnection";
import {Media} from "../../Entities/Media";

process.on('message', async (message) => {

  await DBConnection.createConnection(message.data.dbStorePath)
  const location = await Location.findOne(message.data.locationId);

  var successQty = 0;

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
      } else {
        if (message.data.action !== undefined) {
          await media.mediaService.copyOrMoveFileToLocation(message.data.action);
        }
      }

      await media.save();

      let actionName = 'Synchronizing'

      if (message.data.regenerateThumbs === true) {
        await media.mediaService.storeThumb();
        actionName = 'Importing'
      }

      notify(message.id, true, media.filename, message.data.paths.length, i + 1, actionName);

      successQty++;

    } catch (e: any) {
      // TODO: emit errors during discovering
      console.error(`Discover worker error: "${e.message}": ${message.data.paths[i]}`);
      // @ts-ignore
      process.send({
        type: 'error-bag',
        msg: {
          filename: message.data.paths[i],
          // filename: message.filename,
          error: e.message
        }
      });

    }

  }
  notify(message.id, false, 'Finish!', 1, 1, 'Synchronizing')
  // @ts-ignore
  process.send({
    type: 'notifyDesktop',
    msg: {title: 'Finished!', body: `Processed ${successQty} media file(s)`}
  });
});

function notify(workerName: string, processing: boolean, title: string, total: number, current: number, job: string) {
  let msg = {
    job: job,
    workerName: workerName,
    processing: processing,
    data: {
      title: title,
      total: total,
      current: current
    }
  } as IFrontNotificationWorker

  // @ts-ignore
  process.send({type: 'notifyFront', msg});
}

