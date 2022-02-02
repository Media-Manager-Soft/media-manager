import { Media } from "../Entities/Media";
import { getManager } from "typeorm";
import { DateNavResource } from "../Resources/DateNavResource";

export class NavData {
  static async getDates() {
    let data = await getManager().query(
      `SELECT 
       strftime('%Y-%m-%d', "takenAt") as takenAtDate, 
       COUNT("id") as qty
       FROM "media"
       group by takenAtDate
       order by takenAtDate DESC`
    );
    // return data;
    return new DateNavResource(data).resource();
  }


}
