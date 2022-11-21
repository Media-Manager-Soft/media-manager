import {Component} from '@angular/core';
import {MediaService} from "../../media/media.service";
import {ElectronService} from "../../core/services/electron.service";
import {LocationService} from "../locations/location.service";

@Component({
  selector: 'app-flags',
  templateUrl: './flags.component.html',
  styleUrls: ['./flags.component.scss']
})

export class FlagsComponent {

  constructor(
    private mediaService: MediaService,
    private electronService: ElectronService,
    private locationService: LocationService,
  ) {
  }

  selected = {
    picked: false,
    none: false,
    rejected: false,
  }

  toggle(key: string, value: boolean) {
    // @ts-ignore
    this.selected[key] = value;
    this.mediaService.setQuery({type: 'flags', parameters: this.selectedToArray()}).getMedia();
  }

  selectedToArray() {
    let values = [];
    this.selected.picked ? values.push(1) : null;
    this.selected.none ? values.push(0) : null;
    this.selected.rejected ? values.push(-1) : null;
    return values;
  }

  deleteRejected(ev: any) {
    ev.stopPropagation();
    let result = confirm('All media from selected locations will be deleted. This will be undone. Are you sure?')
    if (result) {
      this.electronService.ipcRenderer.invoke('media-actions', {
        action: 'deleteRejected',
        data: {
          locationsIds: this.locationService.getSelected(),
        }
      }).then(() => {
        this.locationService.setDateByLocation()
        this.mediaService.getMedia(true);
      })
    }
  }

}
