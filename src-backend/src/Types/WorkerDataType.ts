export type WorkerDataType = {
  dbStorePath: string,
  paths: string[],
  locationId: string | number,
  regenerateThumbs: Boolean
  actionType: "Synchronizing" | "Importing",
  fileActionType?: "move" | "copy",
}
