import { Component, Input } from '@angular/core';
import { GridService } from "../../grid/grid.service";
import { MediaService } from "../../media.service";
import {ElectronService} from "../../../core/services/electron.service";

@Component({
  selector: 'app-preview-tools',
  templateUrl: './preview-tools.component.html',
  styleUrls: ['./preview-tools.component.scss']
})
export class PreviewToolsComponent {

  @Input()
  mediaItemIndex: number

  constructor(
    public gridService: GridService,
    public mediaService: MediaService,
    private electronService: ElectronService,
    ) {

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
  openInExternal(){
    this.electronService.ipcRenderer.send('open-in-external', this.mediaService.media[this.mediaItemIndex].id);
  }
}
