import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { ElectronService } from "../../core/services/electron.service";
import { TreeItemDto } from "./tree-view/tree-iten.dto";
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
