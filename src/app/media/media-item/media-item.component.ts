import { Component, Input, ViewChild } from '@angular/core';
import { ElectronService } from "../../core/services/electron.service";
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
    private electronService: ElectronService,
    private gridService: GridService,
    private mediaService: MediaService,
  ) {
  }

  async setThumb() {
    await this.electronService.ipcRenderer.invoke('get-thumbnail', {mediaId: this.media.id}).then((data) => {
      if (data) {
        const urlCreator = window.URL || window.webkitURL;
        const blob = new Blob([data]);
        this.thumbnail.nativeElement.src = urlCreator.createObjectURL(blob)
      }
    })
  }

  ngAfterViewInit() {
    this.setThumb();
    this.thumbnail.nativeElement.class = 'rotate-' + this.media.orientation;
  }

  previewMedia() {
    this.gridService.selectMediaIndexForPreview(this.mediaItemIndex)
  }

}
