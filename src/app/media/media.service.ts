import { Injectable } from '@angular/core';
import { QueryDto } from "./query.dto";
import { findIndex as _findIndex } from 'lodash';
import { Observable, Subscription } from "rxjs";
import { ElectronService } from "../core/services/electron.service";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private queries: QueryDto[] = []
  private pagination = {
    skip: 0,
    take: 0,
  }

  public media$: Subscription;
  public media: any[] = [];

  constructor(
    private electronService: ElectronService,
  ) {
    this.resetPagination();
  }

  getMedia() {
    this.media$ = new Observable((observer) => {
      this.electronService.ipcRenderer.invoke('get-media', {query: this.queries, pagination: this.pagination})
        .then((result) => {
          observer.next(result)
        })
        .catch()
        .finally(() => {
          observer.complete();
        })
    }).subscribe((media) => {
      // @ts-ignore
      this.media.push(...media)
      this.getThumbs()
    });
  }

  public incrementPagination() {
    this.pagination.skip += 30;
    this.pagination.take = 30;
  }

  public resetPagination() {
    this.pagination.skip = 0;
    this.pagination.take = 30;
  }

  async getThumbs() {
    for (let step = 0; step < this.media.length;) {
      this.media[step].thumbnail = await this.getThumbFromBackend(this.media[step]);
      step++;
    }
  }

  async getThumbFromBackend(media: any) {
    return await new Promise(async resolve => {
      this.electronService.ipcRenderer.invoke('get-thumbnail', {mediaId: media.id}).then((data) => {
        resolve(data);
      })
    })
  }

  setQuery(query: QueryDto) {
    // @ts-ignore
    this.queries[query.type] = query.parameters;
    this.resetPagination();
    this.media = [];
    return this;
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

