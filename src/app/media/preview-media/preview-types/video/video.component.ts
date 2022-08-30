import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {

  constructor() { }

  @Input() isLoading: boolean;
  @Input() src: any;

  ngOnInit(): void {
  }

}
