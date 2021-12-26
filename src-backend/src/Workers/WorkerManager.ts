import * as path from "path";

const {v4: uuidv4} = require('uuid');

const workerpool = require('workerpool');

class WorkerManager {

  private workers: WorkerMap = {}

  getWorker(uniqueName: string): any {
    return this.workers[uniqueName];
  }

  createWorker(worker: string, maxWorkers: number = 1) {
    let uniqueName = uuidv4()
    if (!this.workers[uniqueName]) {
      this.workers[uniqueName] = workerpool.pool(workers[worker], {workerType: 'process', maxWorkers: maxWorkers});
    }
    return uniqueName;
  }

  terminate(name: string) {
    this.workers[name].terminate();
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

interface WorkersDefinitions {
  [key: string]: string;
}

const workers: WorkersDefinitions = {
  'discover': path.resolve(__dirname, '../../src/Workers/workers/discover.js'),
}

let workerManager = new WorkerManager();

module.exports = workerManager;
