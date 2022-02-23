import { Location } from '../Entities/Location';
import * as fs from "fs";
import * as path from "path";
import { MediaExtensionTypes } from "../Enums/MediaType";
import { Media } from "../Entities/Media";

const bus = require('./../Events/eventBus');
const workerManager = require('./../Workers/WorkerManager');

export class LocationService {
  constructor(private location: Location) {
  }

  protected getAllFiles(dirPath: any, arrayOfFiles: any): any {
    let files = fs.readdirSync(dirPath)
    arrayOfFiles = arrayOfFiles || []
    const availableExtensions: string[] = Object.keys(MediaExtensionTypes);
    //TODO: use path.join
    files.forEach((file) => {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = this.getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
        if (availableExtensions.includes(path.extname(file).toLowerCase())) { // Push only available extensions
          arrayOfFiles.push(path.join(dirPath, "/", file))
        }
      }
    })

    return arrayOfFiles
  }

  public async discoverFiles() {
    let paths = this.getAllFiles(this.location.path, []);

    let id = workerManager.runProcess('discover', {paths: paths, locationId: this.location.id})

    workerManager.getWorker(id).on('message', (resp: any) => {
      bus.emit('notifyFront', resp)
    })
  }

  public async removeIfNotExists() {
    const media = await Media.find({relations: ['location']})
    media.forEach(media => {
      !media.fileExists() ? media.removeWithThumb() : null;
    })
  }
}
