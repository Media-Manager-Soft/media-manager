import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss']
})
export class ArrowComponent {

  constructor() { }

  @Input()
  public position = 'top'

}
