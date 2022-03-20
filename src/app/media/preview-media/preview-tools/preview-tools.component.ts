import { Component, Input } from '@angular/core';
import { GridService } from "../../grid/grid.service";
import { MediaService } from "../../media.service";

@Component({
  selector: 'app-preview-tools',
  templateUrl: './preview-tools.component.html',
  styleUrls: ['./preview-tools.component.scss']
})
export class PreviewToolsComponent {

  @Input()
  mediaItemIndex: number

  constructor(public gridService: GridService, public mediaService: MediaService) {

  }

  toggleFavorite(){
    this.mediaService.updateMedia(
      this.mediaService.media[this.mediaItemIndex].id,
      {favorite: !this.mediaService.media[this.mediaItemIndex].favorite}
    )
  }
  toggleFlag(flag:number){
    this.mediaService.updateMedia(
      this.mediaService.media[this.mediaItemIndex].id,
      {flag: flag}
    )
  }
}
