import "reflect-metadata";
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import { createConnection } from "typeorm";
import { Location } from "./src/Entities/Location";
import { Media } from "./src/Entities/Media";
import { APP_DATA } from "./src/configs";

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
      pathname: isDev ? 'localhost:4200' : path.resolve(__dirname, '../../MB/index.html'),
      protocol: isDev ? 'http:' : 'file:',
      slashes: true
    })
  );

  createConnection({
    type: "sqlite",
    database: path.join(APP_DATA, 'db', 'db.sqlite'),
    synchronize: true,
    entities: [
      Location,
      Media,
    ],
    logging: false
    // logging: true
  })


});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle('get-locations', async () => {
  return await Location.find();
})

ipcMain.handle('get-media', async (event, arg) => {
  return await Media.find();
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

