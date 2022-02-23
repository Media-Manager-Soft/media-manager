import { Injectable } from '@angular/core';
import { QueryDto } from "./query.dto";
import { findIndex as _findIndex } from 'lodash';
import { Observable, Subscription } from "rxjs";
import { findIndex } from "lodash";
import { ElectronService } from "../core/services/electron.service";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private queries: QueryDto[] = []

  public media$: Subscription;
  public media: any;

  constructor(
    private electronService: ElectronService,
  ) {
    this.getMedia();
  }

  getMedia() {
    this.media$ = new Observable((observer) => {
      this.electronService.ipcRenderer.invoke('get-media', {query: this.queries})
        .then((result) => {
          observer.next(result)
        })
        .catch()
        .finally(() => {
          observer.complete();
        })
    }).subscribe(media => {
      return this.media = media;
    });
  }

  setQuery(query: QueryDto) {
    let q = _findIndex(this.queries, {type: query.type})
    if (q > -1) {
      this.queries[q] = query;
    } else {
      this.queries.push(query);
    }
    this.getMedia();
  }

  updateMedia(mediaId: number, data: any) {
    this.electronService.ipcRenderer.invoke('update-metadata', {mediaId, data}).then((res) => {
      const index = findIndex(this.media, {id: res.id});
      Object.keys(data).forEach(key => {
        this.media[index][key] = res[key];
      })
    })
  }
}

