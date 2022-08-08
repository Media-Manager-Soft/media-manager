import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElectronService} from "../core/services/electron.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {
  text = ''
  isModalOpen = false;
  workers: any = {};

  constructor(
    private electronService: ElectronService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  get workersKeys() {
    return Object.keys(this.workers);
  }

  processTerminated(ev: any) {
    delete this.workers[ev];
    this.isModalOpen = false;
    window.location.reload(); //TODO: temporary solution
  }

  ngOnInit() {
    this.electronService.ipcRenderer.on('notification', (evt, message) => {
      if (message.processing === false) {
        delete this.workers[message.workerName];
        this.isModalOpen = false;
        window.location.reload(); //TODO: temporary solution
      } else {
        this.workers[message.workerName] = message
        this.isModalOpen = true;
      }
      this.cdr.detectChanges();
    })
  }

}
