import { Component } from '@angular/core';
import { MediaService } from "../../media/media.service";

@Component({
  selector: 'app-no-date',
  templateUrl: './no-date.component.html',
  styleUrls: ['./no-date.component.scss']
})
export class NoDateComponent {

  constructor(private mediaService: MediaService) {
  }

  selected: boolean = false;

  toggle() {
    this.selected = !this.selected;
    this.mediaService.setQuery({type: 'no_dates', parameters: {no_dates: this.selected}})
  }
}
