import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() current: number;
  @Input() max: number;

  constructor() { }

  ngOnInit(): void {
  }

}
