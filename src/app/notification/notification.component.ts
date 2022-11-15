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
    this.reloadPage();
  }

  ngOnInit() {
    this.electronService.ipcRenderer.on('notification', (evt, message) => {
      if (message.processing === false) {
        delete this.workers[message.workerName];
        this.isModalOpen = false;
        this.reloadPage();
      } else {
        this.workers[message.workerName] = message
        this.isModalOpen = true;
      }
      this.cdr.detectChanges();
    })
  }

  reloadPage() {
    //TODO: this shitty solution should be solved by reloading dates and media items in grid
    history.pushState(null, '', window.location.href);
    window.location.reload();
  }

}
