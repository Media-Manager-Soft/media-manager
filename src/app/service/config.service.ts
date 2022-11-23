import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor() {
  }

  set(key: string, value: any) {
    localStorage.setItem(key, value)
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  getArray(key: string): string[] {
    let string = localStorage.getItem(key);
    return string === null ? [] : string.split(',')
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

}
