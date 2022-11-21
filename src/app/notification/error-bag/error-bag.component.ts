import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-error-bag',
  templateUrl: './error-bag.component.html',
  styleUrls: ['./error-bag.component.scss']
})
export class ErrorBagComponent implements OnInit {

  constructor() { }

  @Input()
  showErrorModal = false

  @Input()
  errors: {filename: String, error: String}[] = []

  @Output()
  closeModal = new EventEmitter<void>();

  ngOnInit(): void {
  }

}
