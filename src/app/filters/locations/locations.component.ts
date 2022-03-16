import { Component, OnInit } from '@angular/core';
import { ElectronService } from "../../core/services/electron.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MediaService } from "../../media/media.service";
import { countBy, filter, find, map } from "lodash"
import { DatesService } from "../dates/dates.service";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locations: location[];
  isModalOpen = false;

  constructor(
    private electronService: ElectronService,
    private mediaService: MediaService,
    private datesService: DatesService) {
  }

  newPathForm = new FormGroup({
    path: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getLocations().then((data) => {
      if (this.locations.length > 0) {
        //TODO: Get data from eg. local storage
        this.locations[0].isSelected = true;
      }
      this.setDateByLocation();
      this.setQuery(false)
    });
  }

  async getLocations() {
    await this.electronService.ipcRenderer.invoke('get-locations').then((result) => {
      this.locations = result;
    })
    return this.locations;
  }

  toggleSelect(location: any) {
    let loc = find(this.locations, {id: location.id});
    const selQty = countBy(this.locations, (location) => {
      return location.isSelected;
    })
    // @ts-ignore
    if (selQty.true === 1 && !!location.isSelected){
      return;
    }
    // @ts-ignore
    loc.isSelected = !loc.isSelected;
    this.setQuery();
  }

  getSelected() {
    return map(filter(this.locations, {isSelected: true}), 'id');
  }

  setDateByLocation() {
    this.datesService.getDates(this.getSelected());
  }

  setQuery(getMedia = true) {
    this.setDateByLocation();
    this.mediaService.setQuery({type: 'locations', parameters: this.getSelected()}, getMedia)
  }

  onSubmit() {
    this.createLocation(this.newPathForm.value).then(() => {
      this.getLocations();
    });
  }

  selectFolder() {
    this.electronService.ipcRenderer.invoke('select-folder')
      .then((rsp) => {
        if (!rsp.canceled) {
          this.newPathForm.patchValue({'path': rsp.filePaths[0]});
        }
      })
      .catch(e => {

      });
  }

  //TODO: For DEV Only
  send() {
    this.electronService.ipcRenderer.send('async-msg', 'ping')
  }

  async createLocation(data: any) {
    await this.electronService.ipcRenderer.invoke('store-location', data);
  }

}

interface location {
  isSelected: boolean;
  name: string;
}
