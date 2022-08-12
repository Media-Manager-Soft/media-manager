import {Component, Input, OnInit} from '@angular/core';
import {ILocation} from "../../filters/locations/ILocation";
import {ElectronService} from "../../core/services/electron.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  isModalOpen: boolean = false

  @Input()
  locations: ILocation[];

  constructor(
    private electronService: ElectronService
  ) {
  }

  importForm = new FormGroup({
    path: new FormControl('', [Validators.required]),
    locationId: new FormControl(null, [Validators.required]),
    action: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
  }

  onSubmit() {
    this.importMedia(this.importForm.value).then(() => {
      this.isModalOpen = false;
      // this.locationAdded.emit(true);
    });
  }

  async importMedia(data: any) {
    await this.electronService.ipcRenderer.invoke('locations', {action: 'import', data});
  }

  selectFolder() {
    this.electronService.ipcRenderer.invoke('locations', {action: 'selectFolder'})
      .then((rsp) => {
        if (!rsp.canceled) {
          this.importForm.patchValue({'path': rsp.filePaths[0]});
        }
      })
      .catch(e => {

      });
  }

}
