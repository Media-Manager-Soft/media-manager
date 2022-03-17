import { Component } from '@angular/core';
import { MediaService } from "../../media/media.service";

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss']
})
export class FlagsComponent {

  constructor(private mediaService: MediaService) {
  }

  selected = {
    picked: false,
    none: false,
    rejected: false,
  }

  toggle(key: string, value: boolean) {
    // @ts-ignore
    this.selected[key] = value;
    this.mediaService.setQuery({type: 'flags', parameters: this.selectedToArray()}).getMedia();
  }

  selectedToArray() {
    let values = [];
    this.selected.picked ? values.push(1) : null;
    this.selected.none ? values.push(0) : null;
    this.selected.rejected ? values.push(-1) : null;
    return values;
  }
}
