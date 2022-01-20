import { app, BrowserWindow, dialog, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import { Location } from "./Entities/Location";
import { Media } from "./Entities/Media";
import { DBConnection } from "./Database/DBConnection";
import { fork } from "child_process";

var bus = require('./Events/eventBus');
var workerManager = require('./Workers/WorkerManager')

export class Main {
  // private workerManager: WorkerManager;

  public run() {
    this.onReady();
    this.onWindowClosed();
    DBConnection.createConnection();
    // this.workerManager = new WorkerManager();
    this.ipc()
  }

  protected onReady() {
    let mainWindow: BrowserWindow;

    app.on("ready", () => {
      mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        // icon: path.join(__dirname, "../bin/dist/MB/favicon/icon.png"),
        webPreferences: {
          nodeIntegration: true, // Allows IPC and other APIs
          contextIsolation: false,
          webSecurity: false //Todo: remove if not needed in the future
        },
      });

      mainWindow.webContents.openDevTools();

      const isDev = process.argv.some(val => val === '--serve')

      mainWindow.loadURL(
        url.format({
          pathname: isDev ? 'localhost:4200' : path.resolve(__dirname, '../../../MB/index.html'),
          protocol: isDev ? 'http:' : 'file:',
          slashes: true
        })
      );

      bus.on('notifyFront', (args: any) => {
        mainWindow.webContents.send("notification", args)
      })

    });
  }

  protected onWindowClosed() {
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
  }

  protected ipc() {
    ipcMain.handle('get-locations', async () => {
      return await Location.find();
    })

    ipcMain.handle('get-media', async (event, arg) => {
      return await Media.find({relations: ['thumbnail'], order: {takenAt: 'ASC'}});
    })

    ipcMain.handle('get-thumbnail', async (event, arg) => {
      let media = await Media.findOne(arg.mediaId);
      if (media?.thumbnail === null) {
        media?.metadataService.storeThumb();
      }
      return media.thumbnail
    })

    ipcMain.handle('store-location', async (event, arg) => {
      let location = new Location;
      location.path = arg.path;
      location.name = arg.name;
      await location.save();
      location.service().discoverFiles();
    })

    ipcMain.handle('select-folder', (event, arg) => {
      const {dialog} = require('electron')
      return dialog.showOpenDialog({properties: ['openDirectory']});
    })
    //todo: temp
    ipcMain.on('async-msg', async (event, arg) => {
      var loc = await Location.findOne(13)
      loc?.service().discoverFiles();
    })

    ipcMain.handle('terminate-process', async (event, arg) => {
      await workerManager.terminate(arg.processId)
    })

    ipcMain.handle('get-media-for-preview', async (event, mediaId) => {
      let media = await Media.findOne(mediaId, {relations: ['location']});
      return media?.getPathToFile();
    })
  }


}
