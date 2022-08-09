import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from "../../core/services/electron.service";
import { MediaService } from "../../media/media.service";
import { countBy, filter, find, map, remove } from "lodash"
import { DatesService } from "../dates/dates.service";
import { ILocation } from "./ILocation";
import { LocationEditFormComponent } from "./location-edit-form/location-edit-form.component";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})

export class LocationsComponent implements OnInit {

  @ViewChild(LocationEditFormComponent) locationEditForm: LocationEditFormComponent;

  locations: ILocation[];
  isAddModalOpen = false;

  constructor(
    private electronService: ElectronService,
    private mediaService: MediaService,
    private datesService: DatesService) {
  }

  ngOnInit(): void {
    this.getLocations().then(() => {
      if (this.locations.length > 0) {
        //TODO: Get data from eg. local storage
        this.locations[0].isSelected = true;
      }
      this.setDateByLocation();
      this.setQuery()
    });
  }

  async getLocations() {
    await this.electronService.ipcRenderer.invoke('locations', {action: 'get'}).then((result) => {
      this.locations = result;
    })
    return this.locations;
  }

  toggleSelect(location: any) {
    if (location?.pathExists === false){
      return;
    }
    let loc = find(this.locations, {id: location.id});
    const selQty = countBy(this.locations, (location) => {
      return location.isSelected;
    })
    // @ts-ignore
    if (selQty.true === 1 && !!location.isSelected) {
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

  setQuery() {
    this.setDateByLocation();
    this.mediaService.setQuery({type: 'locations', parameters: this.getSelected()}).getMedia();
  }

  locationCreated() {
    this.getLocations();
    this.isAddModalOpen = false;
  }

  locationRemoved(ev: any) {
    if (ev.isSelected) {
      this.toggleSelect(ev);
    }
    this.setDateByLocation();
    remove(this.locations, {id: ev.id})
    this.mediaService.setQuery({type: 'locations', parameters: this.getSelected()}).getMedia();
  }

}
