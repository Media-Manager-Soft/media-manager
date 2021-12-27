import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElectronService } from "../../core/services/electron.service";

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})

export class WorkerComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() current: number;
  @Input() max: number;
  @Output() terminateProcess = new EventEmitter<string>();

  constructor(private electronService: ElectronService) { }


  terminate() {
    this.electronService.ipcRenderer.invoke('terminate-process', {processId: this.id}).then(() => {
      console.log('asd')
      console.log(this.id)
      this.terminateProcess.emit(this.id);
    })
  }

  ngOnInit(): void {
  }

}
