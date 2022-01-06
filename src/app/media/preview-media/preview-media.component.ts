import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaItemService } from "../media-item/media-item.service";

@Component({
  selector: 'app-preview-media',
  templateUrl: './preview-media.component.html',
  styleUrls: ['./preview-media.component.scss']
})
export class PreviewMediaComponent implements OnInit {
  media: any;
  @ViewChild('viewer') viewer: any;

  constructor(
    private mediaItemService: MediaItemService
  ) {
  }

  ngOnInit(): void {
    this.mediaItemService.currentMedia.subscribe((media: any) => {
      this.media = media
      this.getThumb(media?.thumbnail.thumbnail)
    })
  }

  getThumb(blobData: any) {
    let blob = new Blob([blobData], {type: 'image/webp'});

    let reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onload = () => {
      this.viewer.fullImage = reader.result;
      this.viewer.thumbImage = reader.result;
    };
  }


}
