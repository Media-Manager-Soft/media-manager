import { Injectable } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { TreeItemDto } from "./tree-view/tree-iten.dto";
import { ElectronService } from "../../core/services/electron.service";

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  private dates$: Subscription;
  public items: TreeItemDto[] = [];

  constructor(public electronService: ElectronService) {
  }

  getDates(locations: number[]) {
    this.dates$ = new Observable((observer) => {
      this.electronService.ipcRenderer.invoke('get-nav-dates', locations)
        .then((result) => {
          observer.next(result)
        })
        .catch()
        .finally(() => {
          observer.complete();
        })
    }).subscribe((dates) => {
      this.items = dates as TreeItemDto[];
    });
  }

}
