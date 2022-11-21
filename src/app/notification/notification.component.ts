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
  errors: [] = [];
  showErrors = false;

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
    this.showErrorModal();
  }

  ngOnInit() {
    this.electronService.ipcRenderer.on('notification', (evt, message) => {
      if (message.processing === false) {
        delete this.workers[message.workerName];
        this.isModalOpen = false;
        this.showErrorModal();
      } else {
        this.workers[message.workerName] = message
        this.isModalOpen = true;
      }
      this.cdr.detectChanges();
    })
    this.electronService.ipcRenderer.on('error-bag', (evt, message) => {
      // @ts-ignore
      this.errors.push(message)
    })
  }

  showErrorModal() {
    if (this.errors.length > 0) {
      this.showErrors = true;
    }else {
      this.reloadPage();
    }
  }

  reloadPage() {
    //TODO: this shitty solution should be solved by reloading dates and media items in grid
    history.pushState(null, '', window.location.href + 'index.html');
    window.location.reload();
  }

}
