import { Component, OnInit, ViewChild } from '@angular/core';
import { GridService } from "../grid/grid.service";
import { ElectronService } from "../../core/services/electron.service";

@Component({
  selector: 'app-preview-media',
  templateUrl: './preview-media.component.html',
  styleUrls: ['./preview-media.component.scss']
})
export class PreviewMediaComponent implements OnInit {
  media: any;
  @ViewChild('viewer') viewer: any;

  constructor(
    private gridService: GridService,
    private electronService: ElectronService
  ) {
  }

  ngOnInit(): void {
    this.gridService.currentMedia$.subscribe((media: any) => {
      this.media = media
      // this.setImageForPreview(media?.thumbnail.thumbnail)
      this.setImageForPreview(media)
    })
  }

  protected setImageForPreview(media: any) {
    this.electronService.ipcRenderer.invoke('get-media-for-preview', media.id).then(data => {
      this.viewer.fullImage = 'file://'+data;
      // this.viewer.thumbImage = 'file://'+data;
      this.getThumb(this.media.thumbnail.thumbnail)
    })
  }

  getThumb(blobData: any) {
    let blob = new Blob([blobData], {type: 'image/webp'});

    let reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onload = () => {
      // this.viewer.fullImage = reader.result;
      this.viewer.thumbImage = reader.result;
    };
  }


}
