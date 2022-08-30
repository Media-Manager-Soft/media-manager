import {Injectable} from '@angular/core';
import {MediaService} from "../media.service";

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor(private mediaService: MediaService) {

  }

  public selectedMediaPreview: number | null = null;

  selectMediaIndexForPreview(index: number | null) {
    this.selectedMediaPreview = index;
  }

  nextMediaPreview() {
    this.selectedMediaPreview = (this.selectedMediaPreview ?? 0) + 1;
    this.checkMediaExists();
  }

  prevMediaPreview() {
    this.selectedMediaPreview = (this.selectedMediaPreview ?? 0) - 1
    this.checkMediaExists();
  }

  checkMediaExists() {
    if (this.mediaService.media[this.selectedMediaPreview ?? 0]) {
      return;
    }
    this.selectedMediaPreview = null;
  }
}
