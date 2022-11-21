import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['../../../scss/variables.scss', './modal.component.scss']
})
export class ModalComponent {

  constructor() {
  }

  @Input()
  isOpen!: boolean;

  @Output()
  isOpenChange = new EventEmitter<boolean>();

  @Input()
  title: string | null = null;

  @Input()
  class: string
  
  close() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

}
