import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit, AfterViewInit, OnChanges {

  constructor() {

  }

  @ViewChild('imgControl') imgControl: ElementRef;

  @Input() isLoading: boolean;
  @Input() src: any;

  public data: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setSrc();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.src = changes['src']?.currentValue;
    this.setSrc();
  }

  setSrc() {
    if (!this.imgControl?.nativeElement) {
      return;
    }
    if (typeof this.src === 'string') {
      this.imgControl.nativeElement.src = 'file://' + this.src
    } else {
      const urlCreator = window.URL || window.webkitURL;
      const blob = new Blob([this.src]);
      this.imgControl.nativeElement.src = urlCreator.createObjectURL(blob)
    }
  }
}
