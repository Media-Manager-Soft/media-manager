import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  childProcess: typeof childProcess;
  fs: typeof fs;

  constructor() {
    this.ipcRenderer = window.require('electron').ipcRenderer;
    this.webFrame = window.require('electron').webFrame;

    this.childProcess = window.require('child_process');
    this.fs = window.require('fs');
  }

  get appPath(): string {
    return window.process.execPath
  }

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }
}
