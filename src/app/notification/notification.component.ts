import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ElectronService } from "../core/services/electron.service";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {
  text = 'aaa'
  workers: any = {};
  time: Observable<object>;
  subject = new BehaviorSubject(123);


  constructor(private electronService: ElectronService, private cdr: ChangeDetectorRef) {
  }


  get workersKeys() {
    return Object.keys(this.workers);
  }

  processTerminated(ev:any){
    delete this.workers[ev]
  }

  ngOnInit() {
    this.electronService.ipcRenderer.on('notification', (evt, message) => {
      if (message.processing === false) {
        delete this.workers[message.workerName];
      } else {
        this.workers[message.workerName] = message
      }
      this.cdr.detectChanges();
    })
  }

}
