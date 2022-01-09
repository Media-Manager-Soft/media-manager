import { Component, OnInit } from '@angular/core';
import { GridService } from "./grid.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public media: any;

  constructor(private gridService: GridService) {
  }

  ngOnInit(): void {
    this.getMedia();
  }

  public getMedia() {
    this.gridService.getMedia();
    this.gridService.media$.subscribe(media => {
      return this.media = media;
    });
  }
}
