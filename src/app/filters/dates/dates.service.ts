import { Injectable } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { TreeItemDto } from "./tree-view/tree-iten.dto";
import { ElectronService } from "../../core/services/electron.service";
import { MediaService } from "../../media/media.service";
import { ConfigService } from "../../service/config.service";

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  private dates$: Subscription;
  public items: TreeItemDto[] = [];
  public noDates = false;
  public allDates = true;
  public recentlyImported = false;
  public lastImportAt: {
    locationId: String|null,
    at: String|null,
  } | null;

  constructor(
    public electronService: ElectronService,
    private mediaService: MediaService,
    private configs: ConfigService,
  ) {
    this.lastImportAt = JSON.parse(this.configs.get('last_import') ?? '{}');
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

  getRecentlyImported() {
    this.recentlyImported = !this.recentlyImported;
    this.allDates = false;
    this.noDates = false;
    if (this.recentlyImported) {
      this.unselectAll();
      this.mediaService.setQuery({type: 'recentlyImported', parameters: this.lastImportAt}).getMedia();
    }else {
      this.mediaService.setQuery({type: 'recentlyImported', parameters: {}}).getMedia()
    }
  }

  noDatesToggle(value: boolean | null = null, getData = false) {
    this.noDates = value === null ? !this.noDates : value;
    this.allDates = false;
    if (this.noDates) {
      this.unselectAll();
      this.mediaService.setQuery({type: 'date', parameters: {}})
    }
    this.mediaService.setQuery({type: 'no_dates', parameters: {no_dates: this.noDates}});
    if (getData) {
      this.mediaService.getMedia();
    }
  }

  getAllDates() {
    this.noDates = false;
    this.allDates = true;
    this.mediaService.setQuery({type: 'no_dates', parameters: {no_dates: false}});
    this.unselectAll();
    this.mediaService.setQuery({type: 'date', parameters: null}).getMedia();
  }

  setQuery(data: any) {
    this.noDatesToggle(false)
    this.allDates = false;
    this.mediaService.setQuery({type: 'date', parameters: data}).getMedia();
  }
}
