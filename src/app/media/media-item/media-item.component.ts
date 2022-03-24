import { Component, Input, ViewChild } from '@angular/core';
import { GridService } from "../grid/grid.service";
import { MediaService } from "../media.service";

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
    this.media = this.mediaService.media[mediaIndex]
  }

  @ViewChild('thumbnail') thumbnail: any;

  constructor(
    private gridService: GridService,
    public mediaService: MediaService,
  ) {
  }

  previewMedia() {
    this.gridService.selectMediaIndexForPreview(this.mediaItemIndex)
  }

  setFlag(value:number){
    if (value === this.media.flag){
      value = 0;
    }
    this.mediaService.updateMedia(this.media.id, {flag: value})
  }

}
