import { Component, OnInit } from '@angular/core';
import { DatesService } from "./dates.service";
import { MediaService } from "../../media/media.service";

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent implements OnInit {

  constructor(public datesService: DatesService, protected mediaService: MediaService) {
  }

  ngOnInit(): void {

  }


  noDatesToggle() {
    this.datesService.noDates = !this.datesService.noDates;
    // if (this.datesService.noDates) {
    // }
    this.datesService.unselectAll();
    this.mediaService.setQuery({type: 'no_dates', parameters: {no_dates: this.datesService.noDates}})
  }

}
