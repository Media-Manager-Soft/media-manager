import { Injectable } from '@angular/core';
import { ElectronService } from "../core/services/electron.service";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locations: any;

  constructor(private electronService: ElectronService) {
  }

  async getLocations() {
    await this.electronService.ipcRenderer.invoke('get-locations').then((result) => {
      this.locations = result;
    })
    return this.locations;
  }

  async createLocation(data: any) {
    await this.electronService.ipcRenderer.invoke('store-location', data);
  }

  removeLocation() {

  }
}
