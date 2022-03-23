import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElectronService } from "../../../core/services/electron.service";
import { ILocation } from "../ILocation";

@Component({
  selector: 'app-location-edit-form',
  templateUrl: './location-edit-form.component.html',
  styleUrls: ['./location-edit-form.component.scss']
})
export class LocationEditFormComponent implements OnInit {

  removeMissing = true;
  regenerateThumbs = true;

  @Input()
  isModalOpen = false;

  @Output()
  locationDeleted = new EventEmitter<ILocation>()

  location: ILocation;
  newName: string;

  constructor(private electronService: ElectronService) {
  }

  ngOnInit(): void {
  }

  up(ev: any) {
    this.newName = ev.target.value;
  }

  sync() {
    this.electronService.ipcRenderer.invoke('locations', {
      action: 'sync',
      data: {
        locationId: this.location.id,
        removeMissing: this.removeMissing,
        regenerateThumbs: this.regenerateThumbs,
      }
    }).then(() => {
      this.isModalOpen = false;
    })
  }

  update() {
    this.electronService.ipcRenderer.invoke('locations', {
      action: 'update',
      data: {
        name: this.newName,
        locationId: this.location.id,
      }
    }).then(() => {
      this.location.name = this.newName;
      this.isModalOpen = false;
    })
  }

  delete(){
    if (confirm('Are you sure all items from database? No file will be deleted.')) {
      this.electronService.ipcRenderer.invoke('locations', {
        action: 'delete',
        data: {
          locationId: this.location.id,
        }
      }).then(() => {
        this.locationDeleted.emit(this.location)
        this.isModalOpen = false;
      })
    }
  }

  openModal(location: ILocation) {
    this.location = location;
    this.newName = location.name;
    this.isModalOpen = true;
  }
}
