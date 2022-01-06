import { Component, Input, ViewChild } from '@angular/core';
import { ElectronService } from "../../core/services/electron.service";
import { MediaItemService } from "./media-item.service";

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.scss']
})
export class MediaItemComponent {
  @Input() media!: any;
  @ViewChild('thumbnail') thumbnail: any;
  constructor(
    private electronService: ElectronService,
    private mediaItemService: MediaItemService
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

  previewMedia(media: any){
    this.mediaItemService.changeMessage(media)
  }

}
