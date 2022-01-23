import { Component, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { GridService } from "../grid/grid.service";
import { ElectronService } from "../../core/services/electron.service";

@Component({
  selector: 'app-preview-media',
  templateUrl: './preview-media.component.html',
  styleUrls: ['./preview-media.component.scss']
})
export class PreviewMediaComponent {
  media: any;
  @ViewChild('thumb') thumb: ElementRef;
  private currentIndex: number;

  @Input() set previewItemIndex(mediaIndex: any) {
    this.currentIndex = mediaIndex;
    this.media = this.gridService.media[mediaIndex]
    this.setImageForPreview(this.media)
  }

  @Output() modalClosed = new EventEmitter<boolean>();

  constructor(
    public gridService: GridService,
    private electronService: ElectronService
  ) {
  }

  protected setImageForPreview(media: any) {
    this.electronService.ipcRenderer.invoke('get-media-for-preview', media.id).then(data => {
      this.thumb.nativeElement.src = 'file://' + data;
    })
  }

  getThumb(blobData: any) {
    let blob = new Blob([blobData], {type: 'image/webp'});

    let reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onload = () => {
      // this.viewer.fullImage = reader.result;
      // this.viewer.thumbImage = reader.result;
    };
  }

  closeModal() {
    this.modalClosed.emit(true);
    this.media = null;
  }


}
