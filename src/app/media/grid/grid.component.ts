import { Component, OnInit } from '@angular/core';
import { GridService } from "./grid.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public media: any;
  private currentSeparatorValue: string

  constructor(private gridService: GridService) {
  }

  ngOnInit(): void {
    this.getMedia();
  }

  getMedia() {
    this.gridService.getMedia();
    this.gridService.media$.subscribe(media => {
      return this.media = media;
    });
  }

  shouldSeparateGrid(value: any): Boolean {
    const stringDate = new Date(value).toDateString();
    const result = this.currentSeparatorValue !== stringDate;
    this.currentSeparatorValue = stringDate;
    return result
  }
}
