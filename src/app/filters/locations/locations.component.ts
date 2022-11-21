import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationEditFormComponent} from "./location-edit-form/location-edit-form.component";
import {LocationService} from "./location.service";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})

export class LocationsComponent implements OnInit {

  @ViewChild(LocationEditFormComponent) locationEditForm: LocationEditFormComponent;


  constructor(
    public locationService: LocationService
  ) {
  }

  ngOnInit(): void {
    this.locationService.getLocations().then(() => {
      if (this.locationService.locations.length > 0) {
        //TODO: Get data from eg. local storage
        this.locationService.locations[0].isSelected = true;
      }
      this.locationService.setDateByLocation();
      this.locationService.setQuery()
    });
  }


}
