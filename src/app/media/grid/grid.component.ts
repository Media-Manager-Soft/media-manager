import {Component, OnInit} from '@angular/core';
import {GridService} from "./grid.service";
import {MediaService} from "../media.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public currentSeparatorValue: string | null = null

  constructor(
    public gridService: GridService,
    public mediaService: MediaService,
  ) {
  }

  ngOnInit(): void {
  }

  setNewSeparatorValue(value: string | null): string | null {
    this.currentSeparatorValue = value;
    return this.currentSeparatorValue;
  }

  modalClosed() {
    this.gridService.selectMediaIndexForPreview(null);
  }

  onScroll() {
    this.mediaService.incrementPagination();
    this.mediaService.getMedia();
  }

}
