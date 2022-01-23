import { Injectable } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { ElectronService } from "../../core/services/electron.service";

@Injectable({
  providedIn: 'root'
})
export class GridService {

  public media$: Subscription;
  public selectedMediaPreview: number | null;
  public media: any;

  constructor(
    private electronService: ElectronService,
  ) {
  }

  selectMediaIndexForPreview(index: number | null) {
    this.selectedMediaPreview = index;
  }

  nextMediaPreview() {
    this.selectedMediaPreview = (this.selectedMediaPreview ?? 0) + 1;
  }

  prevMediaPreview() {
    this.selectedMediaPreview = (this.selectedMediaPreview ?? 0) - 1
  }

  getMedia() {
    this.media$ = new Observable((observer) => {
      this.electronService.ipcRenderer.invoke('get-media', {query: 'all'})
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
}
