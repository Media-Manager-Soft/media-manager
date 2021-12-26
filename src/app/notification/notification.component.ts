import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ElectronService } from "../core/services/electron.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {

  workers: any = {};
  workersArr: [] = [];

  constructor(private electronService: ElectronService) {
  }

  terminate(processId: string) {
    this.electronService.ipcRenderer.invoke('terminate-process', {processId: processId}).then(() => {
      console.log('ok')
      // this.message = {}
    })
  }


  get workersKeys() {
    return Object.keys(this.workers);
  }

  showArray() {
    // @ts-ignore
    this.workers['oNInit23'] = {'workerName': 'aaaaaadasd asd sds d'}

    console.log(this.workers)
    // console.log(this.workers.length)
  }

  ngOnInit() {

    this.workers['oNInit'] = {'workerName': 'aaaaaadasd asd sds d'}

    // this.time = new Observable<object>((observer: Observer<object>) => {
    //   new Promise((resolve, reject) => {
    //     this.electronService.ipcRenderer.on('notification', (evt, message) => {
    //       console.log(message)
    //       resolve(message)
    //     })
    //   }).then((rsp) => {
    //     // @ts-ignore
    //     observer.next({...rsp})
    //   });
    // });
    //
    // this.time.subscribe((s) => {
    //   // @ts-ignore
    //   // this.workers[message.workerName] = s
    //   // @ts-ignore
    //   this.workersArr.push([s])
    //   // this.message.push({...s})
    //   console.log(s)
    // })

    this.electronService.ipcRenderer.on('notification', (evt, message) => {
      // @ts-ignore
      this.setMessage(message)
    })

  }

  setMessage(message: any) {
    // Object.assign(this.workers, message)
    console.log(message)
    this.workers[message.workerName] = message
  }


}

//
// interface WorkerNotificationData {
//   [key: string]: string;
// }
