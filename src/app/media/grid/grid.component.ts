import { Component, OnInit } from '@angular/core';
import { GridService } from "./grid.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  private currentSeparatorValue: string

  constructor(public gridService: GridService) {
  }

  ngOnInit(): void {
    this.getMedia();
  }

  getMedia() {
    this.gridService.getMedia();
  }

  shouldSeparateGrid(value: any): Boolean {
    const stringDate = new Date(value).toDateString();
    const result = this.currentSeparatorValue !== stringDate;
    this.currentSeparatorValue = stringDate;
    return result
  }

  modalClosed(){
    this.gridService.selectMediaIndexForPreview(null);
  }
}
