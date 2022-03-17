import { Injectable } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { TreeItemDto } from "./tree-view/tree-iten.dto";
import { ElectronService } from "../../core/services/electron.service";
import { MediaService } from "../../media/media.service";

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  private dates$: Subscription;
  public items: TreeItemDto[] = [];
  public noDates = false;

  constructor(public electronService: ElectronService, private mediaService: MediaService) {
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

  unselectAll() {
    this.items.forEach((item) => {
      this.unselectAllChildren(item)
    })
  }

  private unselectAllChildren(item: TreeItemDto) {
    item.isSelected = false;
    item.children.forEach((child) => {
      child.isSelected = false;
      this.unselectAllChildren(child);
    })
  }


  noDatesToggle(value: boolean | null = null, getData = true) {
    this.noDates = value === null ? !this.noDates : value;
    if (this.noDates) {
      this.unselectAll();
      this.mediaService.setQuery({type: 'date', parameters: {}}, false)
    }
    this.mediaService.setQuery({type: 'no_dates', parameters: {no_dates: this.noDates}}, getData)
  }

  setQuery(data: any) {
    this.noDatesToggle(false, false)
    this.mediaService.setQuery({type: 'date', parameters: data})
  }
}
