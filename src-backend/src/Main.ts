import { app, BrowserWindow, ipcMain, Notification, Menu } from "electron";
import * as path from "path";
import * as url from "url";
import { Media } from "./Entities/Media";
import { DBConnection } from "./Database/DBConnection";
import { NavDates } from "./Data/NavDates";
import { MediaQuery } from "./Queries/MediaQuery";
import { PathHelper } from "./Helpers/helpers";
import { UpdateMetaMetadataController } from "./Controllers/UpdateMetaMetadataController";
import { ThumbnailController } from "./Controllers/ThumbnailController";
import { LocationController } from "./Controllers/LocationController";
import { MediaActionsController } from "./Controllers/MediaActionsController";
import { appMainMenu } from "./Menu/Menu";

const bus = require('./Events/eventBus');
const workerManager = require('./Workers/WorkerManager');

export class Main {
  private mainWindow: Electron.CrossProcessExports.BrowserWindow;

  public run() {
    this.onReady();
    this.onWindowClosed();
    DBConnection.createConnection(app.getPath('userData'));
    this.ipc()
  }

  protected onReady() {


    // @ts-ignore
    Menu.setApplicationMenu(Menu.buildFromTemplate(appMainMenu));


    app.on("ready", () => {
      this.mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        title: `Media Manager - ${app.getVersion()}`,
        icon: path.join(__dirname, "/../../../icons/1024x1024.png"),
        webPreferences: {
          nodeIntegration: true, // Allows IPC and other APIs
          contextIsolation: false,
          webSecurity: false, //Todo: remove if not needed in the future
        },
      });

      const {autoUpdater} = require("electron-updater")
      // Object.defineProperty(app, 'isPackaged', { //force fake is packaged
      //   get() {
      //     return true;
      //   }
      // });
      autoUpdater.checkForUpdatesAndNotify().catch((e: any) => {
        const log = require("electron-log")
        log.transports.file.resolvePath = () => path.join(app.getPath('userData'), '/logs/update.log');
        log.error(e)
      });

      const isDev = process.argv.some(val => val === '--serve')

      if (isDev) {
        this.mainWindow.webContents.openDevTools();
        this.mainWindow.loadURL(
          url.format({
            pathname: 'localhost:4200',
            protocol: 'http',
            slashes: true
          })
        );
      } else {
        this.mainWindow.loadFile(
          path.resolve(__dirname, '../../../MB/index.html')
        );
      }


      bus.on('notifyFront', (args: any) => { // Frontend notifications
        this.mainWindow.webContents.send("notification", args)
        let progressVal = args.processing ? (args.data.current * 100 / args.data.total) / 100 : -1;
        this.mainWindow.setProgressBar(progressVal)
      })

      bus.on('notifyDesktop', (args: any) => { // System notifications
        new Notification({title: args.title, body: args.body}).show()
      })

      bus.on('error-bag', (args: any) => { // Error bag
        this.mainWindow.webContents.send("error-bag", args)
      })


      PathHelper.deleteTemp()
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

    ipcMain.handle('get-media', async (event, queries) => {
      return MediaQuery.setQuery(queries.query, queries.pagination).get();
    })

    ipcMain.handle('get-thumbnail', async (event, arg) => {
      return await ThumbnailController.getThumb(arg.mediaId);
    })

    ipcMain.handle('locations', async (event, arg) => {
      return LocationController.dispatch(arg.action, arg.data)
    })

    ipcMain.on('select-folder', async (event) => {
      event.returnValue = await require('electron').dialog.showOpenDialog({properties: ['openDirectory']});
    })

    ipcMain.handle('media-actions', async (event, arg) => {
      return MediaActionsController.dispatch(arg.action, arg.data)
    })

    ipcMain.handle('terminate-process', async (event, arg) => {
      this.mainWindow.setProgressBar(-1);
      await workerManager.terminate(arg.processId)
    })

    ipcMain.handle('get-nav-dates', async (event, locationsIds) => {
      return NavDates.getDates(locationsIds);
    })

    ipcMain.handle('get-media-for-preview', async (event, mediaId) => {
      let media = await Media.findOne(mediaId, {relations: ['location']});
      return {
        type: media?.type,
        data: await media?.converter().full()
      }
    })

    ipcMain.handle('update-metadata', async (event, arg) => {
      return UpdateMetaMetadataController.update(arg.mediaId, arg.data);
    })

    ipcMain.on('open-in-external', async (event, mediaId) => {
      let media = await Media.findOne(mediaId, {relations: ['location']});
      await require('electron').shell.openPath(media?.getPathToFile());
    })
  }


}
