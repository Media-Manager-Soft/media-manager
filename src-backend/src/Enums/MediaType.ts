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
  '.heic': MediaType.PHOTO,

  '.cr2': MediaType.PHOTO_RAW,
  '.nef': MediaType.PHOTO_RAW,

  '.mov': MediaType.VIDEO,
  '.mp4': MediaType.VIDEO,
};
