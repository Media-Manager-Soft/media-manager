import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MediaItemError} from "../../../../dto/media-item-error";

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

  @Output() errorItem = new EventEmitter<MediaItemError>();

  public data: any;
  public notFound: boolean = false;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setSrc();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.notFound = false;
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

  handleMissingImage(ev: Event) {
    this.notFound = true;
    this.errorItem.emit({isError: true, text: 'Photo not found on disk'})
  }
}
