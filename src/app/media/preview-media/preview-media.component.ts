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
  @ViewChild('photoThumb') photoThumb: ElementRef;
  @ViewChild('videoThumb') videoThumb: ElementRef;
  private currentIndex: number;
  currentPreviewType: string;

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
      this.clearViewer();
      this.putPreviewToHtml(data)
    })
  }

  protected putPreviewToHtml(data: any) {
    if (data.type === 'Video') {
      this.videoThumb.nativeElement.src = 'file://' + data.data;
      this.currentPreviewType = 'video';
    } else if (data.type === 'PhotoRaw') {
      this.currentPreviewType = 'photo';

      const urlCreator = window.URL || window.webkitURL;
      const blob = new Blob([data.data]);
      this.photoThumb.nativeElement.src = urlCreator.createObjectURL(blob);

    } else {
      this.photoThumb.nativeElement.src = 'file://' + data.data;
      this.currentPreviewType = 'photo';
    }
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

  clearViewer() {
    this.videoThumb.nativeElement.removeAttribute('src');
    this.photoThumb.nativeElement.removeAttribute('src');
  }

  closeModal() {
    this.clearViewer();
    this.modalClosed.emit(true);
    this.media = null;
  }


}
