import { Component, OnInit } from '@angular/core';
import { GridService } from "./grid.service";
import { MediaService } from "../media.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  private currentSeparatorValue: string = ''

  constructor(public gridService: GridService, public mediaService: MediaService) {
  }

  ngOnInit(): void {
  }


  shouldSeparateGrid(value: any): Boolean {
    const stringDate = new Date(value).toDateString();
    const result = this.currentSeparatorValue !== stringDate;
    this.currentSeparatorValue = stringDate;
    return result
  }

  modalClosed() {
    this.gridService.selectMediaIndexForPreview(null);
  }

  onScroll() {
    this.mediaService.incrementPagination();
    this.mediaService.getMedia();
  }

}
