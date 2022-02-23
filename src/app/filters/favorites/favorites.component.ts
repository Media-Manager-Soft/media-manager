import { Component } from '@angular/core';
import { MediaService } from "../../media/media.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  constructor(private mediaService: MediaService) {
  }

  selected: boolean = false;

  toggle() {
    this.selected = !this.selected;
    this.mediaService.setQuery({type: 'favorites', parameters: {favorites: this.selected}})
  }

}
