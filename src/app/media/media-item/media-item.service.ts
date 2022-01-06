import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MediaItemService {

  private selectedMedia = new Subject();
  currentMedia = this.selectedMedia.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.selectedMedia.next(message)
  }
}
