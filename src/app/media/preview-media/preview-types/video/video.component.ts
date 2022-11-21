import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MediaItemError} from "../../../../dto/media-item-error";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {

  constructor() {
  }
  @ViewChild('videoControl') videoControl: ElementRef;
  @Input() isLoading: boolean;
  @Input() src: any;
  public notFound: boolean = false;
  public canPlay: boolean = false;
  @Output() errorItem = new EventEmitter<MediaItemError>();

  ngOnInit(): void {
  }

  handleMissingImage(ev: Event) {
    this.errorItem.emit({isError: true, text: 'Video not found on disk'})
    this.notFound = true;
  }

  handleCanPlay(ev: Event){
    this.canPlay = true;
  }
}
