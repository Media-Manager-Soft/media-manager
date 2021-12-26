interface IFrontNotificationWorker {
  workerName: string,
  processing: Boolean,
  data?: {
    title: string,
    total: Number,
    current: Number,
  }
}
