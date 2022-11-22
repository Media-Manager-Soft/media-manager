import { Location } from "../../Entities/Location";
import { DBConnection } from "../../Database/DBConnection";
import { Media } from "../../Entities/Media";
import { WorkerDataType } from "../../Types/WorkerDataType";
import moment = require("moment");

process.on('message', async (message) => {

  let {id, data}: { id: string; data: WorkerDataType } = message

  await DBConnection.createConnection(data.dbStorePath)
  const location: Location | undefined = await Location.findOne(data.locationId);

  if (location === undefined) {
    return;
  }

  let successQty = 0;

  for (let i = 0; i < data.paths.length; i++) {
    let media = new Media();
    try {
      await media.mediaService.discoverMetadata(data.paths[i], location);

      let result = await media.mediaService.shouldBeImported();

      if (!!result) { // result - Media from db (if exists)
        Media.UPDATABLE_COLUMNS.forEach((column) => {
          // @ts-ignore
          result[column] = media[column];
        })
        media = result;
      } else {
        if (data.fileActionType !== undefined) {
          media.importedAt = moment().format("YYYY-MM-DD HH:mm:ss");
          await media.mediaService.copyOrMoveFileToLocation(data.fileActionType);
        }
      }

      await media.save();

      if (data.regenerateThumbs) {
        await media.mediaService.storeThumb();
      }

      notify(id, true, media.filename, data.paths.length, i + 1, data.actionType);

      successQty++;

    } catch (e: any) {
      // TODO: emit errors during discovering
      console.error(`Discover worker error: "${e.message}": ${data.paths[i]}`);
      // @ts-ignore
      process.send({
        type: 'error-bag',
        msg: {
          filename: data.paths[i],
          // filename: message.filename,
          error: e.message
        }
      });

    }

  }
  notify(id, false, 'Finish!', 1, 1, data.actionType)
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

