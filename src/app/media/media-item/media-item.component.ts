import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from "../../core/services/electron.service";

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.scss']
})
export class MediaItemComponent implements OnInit {
  @Input() media!: any;
  @ViewChild('thumbnail') thumbnail: any;
  // constructor(
  //   private electronService: ElectronService,
  // ) {
  // }

  getThumb() {
    try {
      const urlCreator = window.URL || window.webkitURL;
      const blob = new Blob([this.media.thumbnail.thumbnail],);
      return urlCreator.createObjectURL(blob);
    } catch (e) {
      // request from backend
      return '/assets/no-preview.jpg'
    }
  }

  ngAfterViewInit() {
    this.thumbnail.nativeElement.src = this.getThumb();
  }

  ngOnInit(): void {
  }


}
