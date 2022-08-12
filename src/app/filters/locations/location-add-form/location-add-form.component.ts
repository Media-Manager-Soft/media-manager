import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ElectronService } from "../../../core/services/electron.service";

@Component({
  selector: 'app-location-add-form',
  templateUrl: './location-add-form.component.html',
  styleUrls: ['./location-add-form.component.scss']
})
export class LocationAddFormComponent {

  @Output()
  locationAdded = new EventEmitter<boolean>()

  @Output()
  isModalOpenChange = new EventEmitter<boolean>();

  @Input()
  isModalOpen = false;

  locationForm = new FormGroup({
    path: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  constructor(private electronService: ElectronService) {
  }

  selectFolder() {
    this.electronService.ipcRenderer.invoke('locations', {action: 'selectFolder'})
      .then((rsp) => {
        if (!rsp.canceled) {
          this.locationForm.patchValue({'path': rsp.filePaths[0]});
        }
      })
      .catch(e => {

      });
  }

  onSubmit() {
    this.createLocation(this.locationForm.value).then(() => {
      this.isModalOpen = false;
      this.locationAdded.emit(true);
    });
  }

  async createLocation(data: any) {
    await this.electronService.ipcRenderer.invoke('locations', {action: 'store', data});
  }

  close(){
    this.isModalOpenChange.emit(false);
  }
}
