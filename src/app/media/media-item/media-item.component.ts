import { Component, Input, ViewChild } from '@angular/core';
import { ElectronService } from "../../core/services/electron.service";
import { GridService } from "../grid/grid.service";

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.scss']
})
export class MediaItemComponent {
  media: any;
  mediaItemIndex: number;

  @Input() set mediaIndex(mediaIndex: any) {
    this.mediaItemIndex = mediaIndex
    this.media = this.gridService.media[mediaIndex]
  }

  @ViewChild('thumbnail') thumbnail: any;

  constructor(
    private electronService: ElectronService,
    private gridService: GridService
  ) {
  }

  getThumb() {
    try {
      const urlCreator = window.URL || window.webkitURL;
      const blob = new Blob([this.media.thumbnail.thumbnail]);
      return urlCreator.createObjectURL(blob);
    } catch (e) {
      // request from backend
      return '/assets/no-preview.jpg'
    }
  }

  ngAfterViewInit() {
    this.thumbnail.nativeElement.src = this.getThumb();
    this.thumbnail.nativeElement.class = 'rotate-' + this.media.orientation;
  }

  previewMedia() {
    this.gridService.selectMediaIndexForPreview(this.mediaItemIndex)
  }

}
