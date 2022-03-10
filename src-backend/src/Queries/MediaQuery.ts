import { QueryDto } from "../Dto/QueryDto";
import { getManager, SelectQueryBuilder } from "typeorm";
import { datePattern } from "./patterns/dataPattern";
import { filter as _filter, find } from "lodash";

export class MediaQuery {
  private queries: QueryDto[];
  private mediaQueryBuilder: SelectQueryBuilder<any>;
  private mediaDateSubQuery: SelectQueryBuilder<any>

  public static setQuery(query: QueryDto[], pagination: { skip: 0, take: 10 }) {
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
    if (!this.verifyQuery()) {
      return [];
    }

    this.applyQueriesToQueryBuilder();
    this.mediaQueryBuilder
      .from("(" + this.mediaDateSubQuery.getQuery() + ")", "media")
    // .setParameters(dateSubQuery.getParameters())
    this.mediaQueryBuilder.orderBy('takenAt', 'DESC')
    return this.mediaQueryBuilder.getRawMany()
  }

  private verifyQuery(): boolean {
    let dateQuery = find(this.queries, {type: 'date'});
    return dateQuery?.parameters?.length > 0;
  }

  private applyQueriesToQueryBuilder() {
    this.queries.map((query) => {
      const functionName = query.type + 'Query';
      // @ts-ignore
      this[functionName](query.parameters);
    })
  }

  private dateQuery(parameters: string[]) {
    datePattern.map((pattern) => {
      let valuesToFind = _filter(parameters, (date) => {
        return date.length === pattern.length;
      })
      valuesToFind.map(value => {
        this.mediaDateSubQuery.orWhere(`STRFTIME("${pattern.pattern}", "takenAt") = "${value}"`)
      })
    })
  }

  private favoritesQuery(parameters: any) {
    if (parameters.favorites) {
      this.mediaQueryBuilder.andWhere('favorite = :fav', {fav: parameters.favorites})
    }
  }

  private flagsQuery(flags: []) {
    if (flags.length > 0) {
      this.mediaQueryBuilder.andWhere("flag IN (:...flags)", {flags})
    }
  }

  private locationsQuery(locations: []) {
    this.mediaQueryBuilder.andWhere("locationId IN (:...locations)", {locations})
  }
}
