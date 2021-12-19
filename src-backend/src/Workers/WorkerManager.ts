import * as path from "path";

const workerpool = require('workerpool');

class WorkerManager {

  private workers: WorkerMap = {}

  public getWorker(name: string): any {
    if (!this.workers[name]) {
      this.workers[name] = workerpool.pool(workers[name], {workerType: 'process', maxWorkers: 1});
    }
    return this.workers[name];
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
