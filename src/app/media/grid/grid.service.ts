import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { ElectronService } from "../../core/services/electron.service";

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private selectedMedia = new Subject();
  currentMedia$ = this.selectedMedia.asObservable();

  public media$: Observable<unknown>;

  constructor(
    private electronService: ElectronService,
  ) {
  }

  selectMedia(message: any) {
    this.selectedMedia.next(message)
  }

  getMedia() {
    this.media$ = new Observable((observer) => {
      this.electronService.ipcRenderer.invoke('get-media', {query: 'all'})
        .then((result) => {
          observer.next(result)
        })
        .catch()
        .finally(()=>{
          observer.complete();
        })
    });
  }
}
