import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-photo-buffer',
  templateUrl: './photo-buffer.component.html',
  styleUrls: ['./photo-buffer.component.scss']
})
export class PhotoBufferComponent implements OnInit {

  constructor() {
  }

  @Input() set buffer(buffer: any) {
    this.setThumb(buffer);
  }

  @Input()
  orientation = ''

  @ViewChild('thumbnail') thumbnail: any;

  ngOnInit(): void {
  }

  setThumb(buffer: any) {
    if (buffer === undefined) {
      return;
    }
    try {
      const urlCreator = window.URL || window.webkitURL;
      const blob = new Blob([buffer]);
      this.thumbnail.nativeElement.src = urlCreator.createObjectURL(blob)
      this.thumbnail.nativeElement.classList.add('rotate-' + this.orientation)
    } catch (e) {
    }
  }

}
