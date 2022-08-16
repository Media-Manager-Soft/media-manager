import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElectronService } from "../../core/services/electron.service";

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})

export class WorkerComponent implements OnInit {

  @Input()
  data: any;

  show = true;

  @Output()
  terminateProcess = new EventEmitter<string>();

  constructor(private electronService: ElectronService) {
  }


  terminate() {
    this.show = false;
    this.electronService.ipcRenderer.invoke('terminate-process', {processId: this.data.workerName}).then(() => {
      this.terminateProcess.emit(this.data.workerName);
    })
  }

  ngOnInit(): void {
  }

}
