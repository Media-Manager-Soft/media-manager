const { autoUpdater } = require("electron-updater")
// This
// in Main
// yarn remove electron-updater
export default class AppUpdater {
  constructor() {
    console.log('asd')
    // const log = require("electron-log")
    // log.transports.file.level = "debug"
    // autoUpdater.logger = log
    autoUpdater.checkForUpdatesAndNotify()
  }
}
