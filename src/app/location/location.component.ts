import { Component, OnInit } from '@angular/core';
import { LocationService } from "./location.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ElectronService } from "../core/services/electron.service";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  locations: [];

  newPathForm = new FormGroup({
    path: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  constructor(private locationService: LocationService, private electronService: ElectronService) {
  }

  ngOnInit(): void {
    this.getLocations();
  }

  async getLocations() {
    this.locations = await this.locationService.getLocations();
  }

  onSubmit() {
    this.locationService.createLocation(this.newPathForm.value).then(() => {
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
}
