import { Component, OnInit } from '@angular/core';
import { DatesService } from "./dates.service";

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent implements OnInit {

  constructor(public datesService: DatesService) {
  }

  ngOnInit(): void {

  }


}
