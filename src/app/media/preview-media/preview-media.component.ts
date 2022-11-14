import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {ElectronService} from "../../core/services/electron.service";
import {MediaService} from "../media.service";
import {MediaItemError} from "../../dto/media-item-error";

@Component({
  selector: 'app-preview-media',
  templateUrl: './preview-media.component.html',
  styleUrls: ['./preview-media.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreviewMediaComponent {
  media: any;
  currentIndex: number;
  currentPreviewType: string;
  isLoading = false;
  itemError: MediaItemError;
  public src: any;

  @Input() set previewItemIndex(mediaIndex: any) {
    this.currentIndex = mediaIndex;
    this.media = this.mediaService.media[mediaIndex]
    if (this.media) {
      this.setImageForPreview(this.media)
    } else {
      this.closeModal();
    }
  }

  @Output() modalClosed = new EventEmitter<boolean>();

  constructor(
    public mediaService: MediaService,
    private electronService: ElectronService
  ) {
  }

  protected setImageForPreview(media: any) {
    this.itemError = {} as MediaItemError;
    this.isLoading = true;
    this.electronService.ipcRenderer.invoke('get-media-for-preview', media.id).then(data => {
      this.setMediaType(data)
      this.isLoading = false;
    })
  }

  protected setMediaType(data: any) {
    this.src = data.data;
    switch (data.type) {
      case 'Video':
        this.currentPreviewType = 'video';
        break;
      case 'PhotoRaw':
      case 'Heic':
        this.currentPreviewType = 'photo';
        break;
      default:
        this.currentPreviewType = 'photo';
        break;
    }
  }

  clearViewer() {
    this.src = null;
  }

  closeModal() {
    if (document.fullscreenElement === null) {
      this.clearViewer();
      this.modalClosed.emit(true);
      this.media = null;
    }
  }


}
