import { Location } from '../Entities/Location';
import * as fs from "fs";
import * as path from "path";
import { Media } from "../Entities/Media";

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

    for (const path of paths) {
      let media = new Media();
      await media.metadataService.discoverMetadata(path, this.location);
      await media.save();
    }

  }
}
