import { getManager, SelectQueryBuilder } from "typeorm";
import { datePattern } from "./patterns/dataPattern";
import { filter as _filter } from "lodash";

export class MediaQuery {
  private queries: any;
  private mediaQueryBuilder: SelectQueryBuilder<any>;
  private skipDataQuery = false;

  public static setQuery(query: any, pagination: { skip: 0, take: 10 }) {
    const c = new this
    c.queries = query
    c.mediaQueryBuilder = getManager().createQueryBuilder()
    c.mediaQueryBuilder.take(pagination.take);
    c.mediaQueryBuilder.skip(pagination.skip);
    return c;
  }

  public get() {
    this.applyQueriesToQueryBuilder();
    this.mediaQueryBuilder.orderBy('takenAt', 'ASC')
    this.mediaQueryBuilder.from('media', 'media')
    if (!this.skipDataQuery){
      return [];
    }
    return this.mediaQueryBuilder.getRawMany()
  }


  private applyQueriesToQueryBuilder() {
    this.dateQuery();
    this.favoritesQuery();
    this.flagsQuery();
    this.locationsQuery();
  }

  private dateQuery() {
    datePattern.map((pattern) => {
      let valuesToFind = _filter(this.queries.date, (date) => {
        return date.length === pattern.length;
      })
      valuesToFind.map(value => {
        this.skipDataQuery = true;
        this.mediaQueryBuilder.orWhere(`STRFTIME("${pattern.pattern}", "takenAt") = "${value}"`)
      })
    })
  }

  private favoritesQuery() {
    if (this.queries.favorites?.favorites) {
      this.skipDataQuery = true;
      this.mediaQueryBuilder.andWhere('favorite = :fav', {fav: this.queries.favorites.favorites})
    }
  }

  private flagsQuery() {
    if (this.queries.flags?.length > 0) {
      this.skipDataQuery = true;
      this.mediaQueryBuilder.andWhere("flag IN (:...flags)", {flags: this.queries.flags})
    }
  }

  private locationsQuery() {
    if (this.queries.locations?.length > 0) {
      this.mediaQueryBuilder.andWhere("locationId IN (:...locations)", {locations: this.queries.locations})
    }
  }
}
