import {Location} from '../Entities/Location';
import * as fs from "fs";
import * as path from "path";
import {MediaExtensionTypes} from "../Enums/MediaType";
import {Media} from "../Entities/Media";
import {WorkerDataType} from "../Types/WorkerDataType";

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

  public async importFiles(path: string, locationId: number, action: string, generateThumbnails: boolean) {
    const app = require('electron').app
    let paths = this.getAllFiles(path, []);
    let id = workerManager.runProcess('discover', {
      dbStorePath: app.getPath('userData'),
      paths: paths,
      locationId: locationId,
      regenerateThumbs: generateThumbnails,
      fileActionType: action,
      actionType: "Importing"
    } as WorkerDataType)

    workerManager.getWorker(id).on('message', (resp: any) => {
      bus.emit(resp.type, resp.msg)
    })
  }

  public async syncFiles(regenerateThumb: boolean = true) {
    const app = require('electron').app
    let paths = this.getAllFiles(this.location.path, []);
    let id = workerManager.runProcess('discover', {
      dbStorePath: app.getPath('userData'),
      paths: paths,
      locationId: this.location.id,
      regenerateThumbs: regenerateThumb,
      actionType: "Synchronizing"
    } as WorkerDataType)

    workerManager.getWorker(id).on('message', (resp: any) => {
      bus.emit(resp.type, resp.msg)
    })
  }

  public async removeIfNotExists() {
    const media = await Media.find({relations: ['location'], where: {location: this.location.id}})
    media.forEach(media => {
      !media.fileExists() ? media.removeWithThumb() : null;
    })
  }
}
