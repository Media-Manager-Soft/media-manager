import { getManager } from "typeorm";
import { DateNavResource } from "../Resources/DateNavResource";

export class NavDates {
  static async getDates(locationIds: number[]) {
    let data = await getManager().query(
      `SELECT strftime('%Y-%m-%d', "takenAt") as takenAtDate,
              COUNT("id")                     as qty
       FROM "media"
       WHERE locationId IN (` + locationIds.join(',') + `)
       AND takenAt IS NOT NULL
       group by takenAtDate
       order by takenAtDate ASC`
    );
    return new DateNavResource(data).resource();
  }


}
