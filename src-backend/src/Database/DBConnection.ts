import { createConnections, getConnectionManager } from "typeorm";
import * as path from "path";
import { APP_DATA } from "../configs";
import { Location } from "../Entities/Location";
import { Media } from "../Entities/Media";
import { Thumbnail } from "../Entities/Thumbnail";

export class DBConnection {
  public static async createConnection() {

    if (getConnectionManager().has('default')) {
      return
    }

    await createConnections([{
      type: "sqlite",
      database: path.join(APP_DATA, 'db', 'db.sqlite'),
      synchronize: true,
      entities: [
        Location,
        Media,
        Thumbnail,
      ],
      logging: false
      // logging: true
    },
      {
        name: "thumbnail",
        type: "sqlite",
        database: path.join(APP_DATA, 'db', 'thumbnail.sqlite'),
        synchronize: true,
        entities: [
          // Thumbnail,
        ],
        logging: false
      }
    ])

  // Thumbnail.useConnection(getConnection('thumbnail'))
  }



}
