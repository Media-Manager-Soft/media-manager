import { getManager, SelectQueryBuilder } from "typeorm";
import { datePattern } from "./patterns/dataPattern";
import { filter as _filter } from "lodash";

export class MediaQuery {
  private queries: any;
  private mediaQueryBuilder: SelectQueryBuilder<any>;
  private mediaDateSubQuery: SelectQueryBuilder<any>
  private skipDataQuery = false;

  public static setQuery(query: any, pagination: { skip: 0, take: 10 }) {
    const c = new this
    c.queries = query
    c.mediaQueryBuilder = getManager().createQueryBuilder()
    c.mediaDateSubQuery = getManager().createQueryBuilder()
      .select("*")
      .from('media', 'm')
    c.mediaQueryBuilder.take(pagination.take);
    c.mediaQueryBuilder.skip(pagination.skip);
    return c;
  }

  public get() {
    this.applyQueriesToQueryBuilder();
    this.mediaQueryBuilder.orderBy('takenAt', 'DESC')
    this.mediaQueryBuilder
      .from("(" + this.mediaDateSubQuery.getQuery() + ")", "media")
    // .setParameters(dateSubQuery.getParameters())
    if (!this.skipDataQuery) {
      return [];
    }
    this.mediaQueryBuilder.select('*')
    this.mediaQueryBuilder.addSelect(`STRFTIME('%Y-%m-%d', "takenAt")`, 'takenAtDate')
    return this.mediaQueryBuilder.getRawMany()
  }


  private applyQueriesToQueryBuilder() {
    if (!this.noDateQuery()) {
      this.dateQuery();
    }
    this.favoritesQuery();
    this.flagsQuery();
    this.locationsQuery();
    this.typesQuery();
    this.lastImportedQuery();
  }

  private dateQuery() {
    if (!this.queries.date) {
      this.mediaQueryBuilder.andWhere("takenAt IS NOT NULL");
      this.skipDataQuery = true;
      return;
    }

    datePattern.map((pattern) => {
      let valuesToFind = _filter(this.queries.date, (date) => {
        return date.length === pattern.length;
      })
      valuesToFind.map(value => {
        this.skipDataQuery = true;
        this.mediaDateSubQuery.orWhere(`STRFTIME("${pattern.pattern}", "takenAt") = "${value}"`)
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

  private typesQuery() {
    if (this.queries.types?.length > 0) {
      this.mediaQueryBuilder.andWhere("type IN (:...types)", {types: this.queries.types})
    }
  }

  private lastImportedQuery() {
    if (this.queries.locations?.includes(parseInt(this.queries.recentlyImported?.locationId))) {
      this.mediaQueryBuilder.andWhere("importedAt > :from", {from: this.queries.recentlyImported?.at});
    }
  }

  private noDateQuery() {
    if (this.queries.no_dates?.no_dates) {
      this.skipDataQuery = true;
      this.mediaQueryBuilder.where("takenAt IS NULL")
      return true;
    } else {
      this.mediaQueryBuilder.where("takenAt IS NOT NULL")
      return false;
    }
  }
}
