import { Media } from "../../../Entities/Media";
import { Location } from "../../../Entities/Location";
const path = require('path');

export class MetadataService {
  constructor(private media: Media) {
  }

  public discoverMetadata(pathToFile: string, location: Location) {
    this.media.location = location;
    this.media.path = path.dirname(pathToFile.replace(location.path, ''));
    this.media.type = 'photo';
    this.media.filename = path.basename(pathToFile);
  }

}
