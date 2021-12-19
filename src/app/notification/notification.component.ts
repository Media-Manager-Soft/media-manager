import { Component, OnInit } from '@angular/core';
import { ElectronService } from "../core/services/electron.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private electronService: ElectronService,) {
  }

  ngOnInit(): void {
    // this.electronService.ipcRenderer.on('asynchronous-reply', (event, arg) => {
    //   console.log(arg) // prints "pong"
    // })
    // this.electronService.ipcRenderer.on('store-location', (event, arg) => {
    //   console.log('store locations') // prints "pong"
    // })
    // this.electronService.ipcRenderer.send('asynchronous-message', 'ping')
    console.log('xxx ccc vvv')
    this.electronService.ipcRenderer.on('notification', function (evt, message) {
      console.log('aaaaaaaaaaaaaaaaaaa')
      console.log(message); // Returns: {'SAVED': 'File Saved'}
    });

  }

}
