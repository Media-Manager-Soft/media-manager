import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { ElectronService } from "../../core/services/electron.service";
import { TreeItemDto } from "./tree-view/tree-iten.dto";

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent implements OnInit {
  private dates$: Subscription;
  public items: TreeItemDto[] = [];
  public isFetching = true;

  constructor(public electronService: ElectronService) {
    this.getDates();
  }

  ngOnInit(): void {

  }

  getDates() {
    this.dates$ = new Observable((observer) => {
      this.electronService.ipcRenderer.invoke('get-nav-dates')
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
