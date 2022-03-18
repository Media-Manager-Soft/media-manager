import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  public selectedMediaPreview: number | null = null;


  selectMediaIndexForPreview(index: number | null) {
    this.selectedMediaPreview = index;
  }

  nextMediaPreview() {
    this.selectedMediaPreview = (this.selectedMediaPreview ?? 0) + 1;
  }

  prevMediaPreview() {
    this.selectedMediaPreview = (this.selectedMediaPreview ?? 0) - 1
  }


}
