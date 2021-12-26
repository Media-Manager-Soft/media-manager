import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
  }

  workersArr: [] = [];

  addWorkerJob(data: any) {
    this.workersArr = []
    // @ts-ignore
    this.workersArr.push(data)
  }
}
