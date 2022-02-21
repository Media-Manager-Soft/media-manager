export enum MediaType {
  PHOTO = "Photo",
  VIDEO = "Video",
  PHOTO_RAW = "PhotoRaw",
}

interface IExtensionTypes {
  [name: string]: string
}

export const MediaExtensionTypes: IExtensionTypes = {
  '.jpg': MediaType.PHOTO,
  '.jpeg': MediaType.PHOTO,
  '.png': MediaType.PHOTO,
  '.bmp': MediaType.PHOTO,
  '.webp': MediaType.PHOTO,
  '.tiff': MediaType.PHOTO,
  '.tif': MediaType.PHOTO,
  '.heic': MediaType.PHOTO,

  '.cr2': MediaType.PHOTO_RAW,
  '.cr3': MediaType.PHOTO_RAW,
  '.nef': MediaType.PHOTO_RAW,

  '.mov': MediaType.VIDEO,
  '.mp4': MediaType.VIDEO,
  '.aa': MediaType.VIDEO,
  '.apng': MediaType.VIDEO,
  '.flv': MediaType.VIDEO,
  '.live_flv': MediaType.VIDEO,
  '.kux': MediaType.VIDEO,
  '.gif': MediaType.VIDEO,
  '.m4a': MediaType.VIDEO,
  '.3gp': MediaType.VIDEO,
  '.3g2': MediaType.VIDEO,
  '.mj2': MediaType.VIDEO,
  '.psp': MediaType.VIDEO,
  '.m4b': MediaType.VIDEO,
  '.ism': MediaType.VIDEO,
  '.ismv': MediaType.VIDEO,
  '.isma': MediaType.VIDEO,
  '.f4v': MediaType.VIDEO,
  '.raw': MediaType.VIDEO,
  '.webm': MediaType.VIDEO,
  '.avi': MediaType.VIDEO,
};
