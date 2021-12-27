import { Component, OnInit } from '@angular/core';
import { ElectronService } from "../../core/services/electron.service";
import exifr from 'exifr'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public media: any;

  constructor(
    private electronService: ElectronService,
  ) {
  }

  getMedia() {
    this.electronService.ipcRenderer.invoke('get-media', {query: 'all'}).then((result) => {
      this.media = result;
    }).catch()
    return this.media;
  }

  // getThumb(media:any) {
  //
  //   const urlCreator = window.URL || window.webkitURL;
  //   const blob = new Blob([media.thumbnail],);
  //   // @ts-ignore
  //   return urlCreator.createObjectURL(blob);
  //   // return this.thumb = url;
  // }
  ngOnInit(): void {
    this.getMedia();

    this.electronService.ipcRenderer.on('reply', (event, arg) => {
      // console.log(arg) // prints "pong"
      // console.log('asdasdsasa') // prints "pong"
    })
  }

}
