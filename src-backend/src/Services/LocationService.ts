import { Location } from '../Entities/Location';
import * as fs from "fs";
import * as path from "path";

const bus = require('./../Events/eventBus');
const workerManager = require('./../Workers/WorkerManager');

export class LocationService {
  constructor(private location: Location) {
  }

  protected getAllFiles(dirPath: any, arrayOfFiles: any): any {
    let files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach((file) => {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = this.getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
        arrayOfFiles.push(path.join(dirPath, "/", file))
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
}
