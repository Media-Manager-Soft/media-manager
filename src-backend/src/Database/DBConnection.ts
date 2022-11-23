import { createConnections, getConnection } from "typeorm";
import * as path from "path";
import { Location } from "../Entities/Location";
import { Media } from "../Entities/Media";
import { Thumbnail } from "../Entities/Thumbnail";

export class DBConnection {
  public static async createConnection(storePath: string) {

    await createConnections([
      {
        type: "sqlite",
        database: path.join(storePath, 'db', 'db.sqlite'),
        synchronize: true,
        entities: [
          Location,
          Media,
          // Thumbnail,
        ],
        logging: false
        // logging: true
      },
      {
        name: "thumbnail",
        type: "sqlite",
        database: path.join(storePath, 'db', 'thumbnail.sqlite'),
        synchronize: true,
        entities: [
          Thumbnail,
        ],
        logging: false
      }
    ])

    Thumbnail.useConnection(getConnection('thumbnail'))
  }


}
