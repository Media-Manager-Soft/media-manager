import { Component, Input, OnInit } from '@angular/core';
import { ILocation } from "../../filters/locations/ILocation";
import { ElectronService } from "../../core/services/electron.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ConfigService } from "../../service/config.service";
import moment = require("moment");

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
    private electronService: ElectronService,
    private configs: ConfigService,
  ) {
  }

  importForm = new FormGroup({
    path: new FormControl('', [Validators.required]),
    locationId: new FormControl(null, [Validators.required]),
    action: new FormControl('', [Validators.required]),
    generateThumbnails: new FormControl(true, [Validators.required]),
  });

  ngOnInit(): void {
  }

  onSubmit() {
    this.importMedia(this.importForm.value).then(() => {
      this.isModalOpen = false;
    });
  }

  async importMedia(data: any) {

    this.configs.set('last_import', JSON.stringify({
      locationId: this.importForm.value.locationId,
      at: moment().format("YYYY-MM-DD HH:mm:ss"),
    }));

    await this.electronService.ipcRenderer.invoke('locations', {action: 'import', data});
  }

  selectFolder() {
    let rsp = this.electronService.ipcRenderer.sendSync('select-folder')
    if (!rsp.canceled) {
      this.importForm.patchValue({'path': rsp.filePaths[0]});
    }
  }

}
