import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icon-chevron',
  templateUrl: './chevron.component.html',
})
export class ChevronComponent implements OnInit {

  constructor() { }

  @Input()
  open = false;

  ngOnInit(): void {
  }

}
