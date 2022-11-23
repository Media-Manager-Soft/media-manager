import "reflect-metadata";
import { Main } from "./src/Main";
import * as path from "path";
import { app } from "electron";

try {
  new Main().run()
} catch (e) {
  const log = require("electron-log")
  log.transports.file.resolvePath = () => path.join(app.getPath('userData'), '/logs/errors.log');
  log.error(e)
}

