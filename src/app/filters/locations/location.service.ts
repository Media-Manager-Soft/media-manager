import {Injectable} from '@angular/core';
import {countBy, filter, find, map, remove} from "lodash";
import {ElectronService} from "../../core/services/electron.service";
import {MediaService} from "../../media/media.service";
import {DatesService} from "../dates/dates.service";
import {ILocation} from "./ILocation";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public locations: ILocation[];
  public isAddModalOpen = false;

  constructor(
    private electronService: ElectronService,
    private mediaService: MediaService,
    private datesService: DatesService
  ) {
  }

  async getLocations() {
    await this.electronService.ipcRenderer.invoke('locations', {action: 'get'}).then((result) => {
      this.locations = result;
    })
    return this.locations;
  }

  toggleSelect(location: any) {
    if (location?.pathExists === false) {
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
