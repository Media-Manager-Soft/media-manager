import { getManager } from "typeorm";
import { DateNavResource } from "../Resources/DateNavResource";

export class NavData {
  static async getDates(locationIds: number[]) {
    console.log(locationIds)
    let data = await getManager().query(
      `SELECT strftime('%Y-%m-%d', "takenAt") as takenAtDate,
              COUNT("id")                     as qty
       FROM "media"
       WHERE locationId IN (` + locationIds.join(',') + `)
        group by takenAtDate
       order by takenAtDate DESC`
    );

    console.log(data)
    // return data;
    return new DateNavResource(data).resource();
  }


}
