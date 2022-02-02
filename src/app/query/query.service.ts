import { Injectable } from '@angular/core';
import { QueryDto } from "./query.dto";
import { findIndex as _findIndex } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private queries: QueryDto[] = []

  setQuery(query: QueryDto) {
    let q = _findIndex(this.queries, {type: query.type})
    if (q > -1) {
      this.queries[q] = query;
      console.log(this.queries)
      return
    }
    this.queries.push(query)
    console.log(this.queries)
  }
}

