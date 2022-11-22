import { Component, OnInit } from '@angular/core';
import { MediaService } from "../../media/media.service";

@Component({
  selector: 'app-media-type',
  templateUrl: './media-type.component.html',
  styleUrls: ['./media-type.component.scss']
})
export class MediaTypeComponent implements OnInit {

  constructor(
    private mediaService: MediaService,
  ) {
  }

  selected = {
    photo: false,
    movie: false,
    raw: false,
  }

  ngOnInit(): void {
  }

  toggle(key: 'photo' | 'raw' | 'movie') {
    this.selected[key] = !this.selected[key]
    this.execute()
  }

  execute() {
    this.mediaService.setQuery({type: 'types', parameters: this.parametersToArray()}).getMedia();
  }

  /**
   * Reference: MediaTypes.ts
   */
  parametersToArray() {
    let parameters: string[] = [];
    for (const [key, value] of Object.entries(this.selected)) {
      if (value) {
        switch (key) {
          case 'movie': {
            parameters.push('Video')
            break;
          }
          case 'raw': {
            parameters.push('PhotoRaw')
            break;
          }
          case 'photo': {
            parameters.push('Photo')
            parameters.push('Heic')
            break;
          }
        }
      }
    }
    return parameters;
  }
}
