import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationEditFormComponent } from "./location-edit-form/location-edit-form.component";
import { LocationService } from "./location.service";
import { ConfigService } from "../../service/config.service";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})

export class LocationsComponent implements OnInit {

  @ViewChild(LocationEditFormComponent) locationEditForm: LocationEditFormComponent;


  constructor(
    public locationService: LocationService,
    private config: ConfigService,
  ) {
  }

  ngOnInit(): void {
    this.locationService.getLocations().then(() => {

      let selected = this.config.getArray('locations');

      if (selected.length === 0) {
        this.locationService.locations[0].isSelected = true;
      } else {
        this.locationService.locations.map((location) => {
          if (selected.includes(String(location.id))) {
            location.isSelected = true
          }
        })
      }

      this.locationService.setDateByLocation();
      this.locationService.setQuery()
    });
  }


}
