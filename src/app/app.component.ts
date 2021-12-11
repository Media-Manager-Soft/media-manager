import { Component } from '@angular/core';
import { ElectronService } from "./core/services/electron.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private electronService: ElectronService,
  ){}


  title = 'MB';
}
