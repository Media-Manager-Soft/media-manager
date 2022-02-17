import { QueryDto } from "../Dto/QueryDto";
import { Media } from "../Entities/Media";
import { getRepository, SelectQueryBuilder } from "typeorm";
import { datePattern } from "./patterns/dataPattern";
import { filter as _filter } from "lodash";

export class MediaQuery {
  private queries: QueryDto[];
  private mediaQueryBuilder: SelectQueryBuilder<Media>;

  public static setQuery(query: QueryDto[]) {
    const c = new this
    c.queries = query
    c.mediaQueryBuilder = getRepository(Media).createQueryBuilder('media')
    return c;
  }

  public get(): Promise<Media[]> {
    this.applyQueriesToQueryBuilder();
    this.mediaQueryBuilder.orderBy('takenAt', 'DESC')
    return this.mediaQueryBuilder.getMany()
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
        this.mediaQueryBuilder.orWhere(`STRFTIME("${pattern.pattern}", "takenAt") = "${value}"`);
      })
    })
  }

}
