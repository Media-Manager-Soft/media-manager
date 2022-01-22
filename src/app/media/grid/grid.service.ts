import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ElectronService } from "../../core/services/electron.service";

@Injectable({
  providedIn: 'root'
})
export class GridService {

  isPreviewOpen = false;

  public media$: Observable<unknown>;
  public selectedMedia: any;

  constructor(
    private electronService: ElectronService,
  ) {
  }

  selectMedia(message: any) {
    this.selectedMedia = message;
    this.isPreviewOpen = true;
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
    });
  }
}
