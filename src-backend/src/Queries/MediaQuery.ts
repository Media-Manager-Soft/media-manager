import { QueryDto } from "../Dto/QueryDto";
import { getManager, SelectQueryBuilder } from "typeorm";
import { datePattern } from "./patterns/dataPattern";
import { filter as _filter } from "lodash";

export class MediaQuery {
  private queries: QueryDto[];
  private mediaQueryBuilder: SelectQueryBuilder<any>;
  private mediaDateSubQuery: SelectQueryBuilder<any>

  public static setQuery(query: QueryDto[]) {
    const c = new this
    c.queries = query
    c.mediaQueryBuilder = getManager().createQueryBuilder()
    c.mediaDateSubQuery = getManager().createQueryBuilder()
      .select("*")
      .from('media', 'm')
    return c;
  }

  public get() {
    this.applyQueriesToQueryBuilder();
    this.mediaQueryBuilder.orderBy('takenAt', 'DESC')
    this.mediaQueryBuilder
      .from("(" + this.mediaDateSubQuery.getQuery() + ")", "media")
    // .setParameters(dateSubQuery.getParameters())
    return this.mediaQueryBuilder.getRawMany()
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
}
