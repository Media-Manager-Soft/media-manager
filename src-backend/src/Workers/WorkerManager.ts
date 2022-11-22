import * as path from "path";
import { fork } from "child_process";
import { WorkerDataType } from "../Types/WorkerDataType";
const {v4: uuidv4} = require('uuid');

class WorkerManager {

  private workers: WorkerMap = {}

  getWorker(uniqueName: string): any {
    return this.workers[uniqueName];
  }

  runProcess(worker: string, data: WorkerDataType) {
    let uniqueName = uuidv4()
    if (!this.workers[uniqueName]) {
      this.workers[uniqueName] = fork(workers[worker])
    }
    this.workers[uniqueName].send({
        id: uniqueName,
        data: data
      }
    );
    return uniqueName;
  }

  async terminate(name: string) {
    await this.getWorker(name).kill();
  }

  terminateAll() {
    Object.keys(this.workers).forEach(worker => {
      this.workers[worker].terminate();
    });
  }
}

interface WorkerMap {
  [key: string]: any;
}

const workers: WorkerMap = {
  'discover': path.resolve(__dirname, '../../src/Workers/workers/discover.js'),
}

module.exports = new WorkerManager();
