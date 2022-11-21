import { Location } from "../Entities/Location";
const fs = require('fs')

export class LocationResource {
  static collection(locations: Location[]) {
    locations.forEach((location) => {
      location.pathExists = fs.existsSync(location.path)
    })
    return locations;
  }
}
