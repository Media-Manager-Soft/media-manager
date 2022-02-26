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
  protected cancelToken = 1;

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
      this.cancelToken++;
      console.log(this.media)
      this.getThumbs()
    });
  }

  getThumbs() {
    _foreach(this.media, async (media) => {
      console.log(media.id)
      // if (currentCancelToken !== this.cancelToken) {
      //   return;
      // }
     media.thumbnail =  await new Promise(async resolve => {
       this.electronService.ipcRenderer.invoke('get-thumbnail', {mediaId: media.id}).then((data) => {
          resolve(data);
          // media.thumbnail = data;
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
    // console.log(this.queries)
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

