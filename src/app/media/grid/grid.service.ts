import { Injectable } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { ElectronService } from "../../core/services/electron.service";

@Injectable({
  providedIn: 'root'
})
export class GridService {

  public selectedMediaPreview: number | null;


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
