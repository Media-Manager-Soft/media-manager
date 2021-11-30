import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";

let mainWindow: Electron.BrowserWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    icon: path.join(__dirname, "../dist/MB/favicon/icon.png"),
    webPreferences: {
      nodeIntegration: true, // Allows IPC and other APIs
      contextIsolation: false,
    },
  });

  mainWindow.webContents.openDevTools();
  const isDev = process.argv.some(val => val === '--serve')

  mainWindow.loadURL(
    url.format({
      pathname: isDev ? 'localhost:4200' : `/dist/MB/index.html`,
      protocol: isDev ? 'http:' : 'file:',
      slashes: true
    })
  );
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on('asd', (event, arg) => {
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
})
