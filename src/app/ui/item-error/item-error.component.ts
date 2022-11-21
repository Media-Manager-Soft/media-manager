import {Component, Input, OnInit} from '@angular/core';
import {MediaItemError} from "../../dto/media-item-error";

@Component({
  selector: 'app-item-error',
  templateUrl: './item-error.component.html',
  styleUrls: ['./item-error.component.scss']
})
export class ItemErrorComponent implements OnInit {

  constructor() { }

  @Input()
  data: MediaItemError;

  ngOnInit(): void {
  }

}
