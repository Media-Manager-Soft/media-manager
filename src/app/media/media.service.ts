import { Injectable } from '@angular/core';
import { QueryDto } from "./query.dto";
import { findIndex as _findIndex, forEach as _foreach } from 'lodash';
import { Observable, Subscription } from "rxjs";
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
      this.media = media;
      this.getThumbs()
    });
  }

  getThumbs() {
    _foreach(this.media, async (media) => {
      media.thumbnail = await new Promise(async resolve => {
        this.electronService.ipcRenderer.invoke('get-thumbnail', {mediaId: media.id}).then((data) => {
          resolve(data);
        })
      })
    })
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
      const index = _findIndex(this.media, {id: res.id});
      Object.keys(data).forEach(key => {
        this.media[index][key] = res[key];
      })
    })
  }
}

