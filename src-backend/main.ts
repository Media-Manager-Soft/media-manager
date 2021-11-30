import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";

let mainWindow: Electron.BrowserWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, "../dist/MB/favicon/icon.png"),
        webPreferences: {
            nodeIntegration: true, // Allows IPC and other APIs
        },
    });

    let isDev = process.argv[2] === '--dev' ;

    mainWindow.loadURL(
      url.format({
          pathname: isDev ? 'localhost:4200' : `/dist/MB/index.html`,
          protocol: isDev ? 'http:' : 'file:',
          slashes: true
      })
    );
});

app.on("window-all-closed", () => {app.quit()});


