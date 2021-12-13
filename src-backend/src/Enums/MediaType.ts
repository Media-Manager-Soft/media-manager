export enum MediaType {
  PHOTO = "photo",
  VIDEO = "video",
  PHOTO_RAW = "photo_raw",
}

// interface IObjectKeys {
//   [key: string]: string;
// }
//   MediaExtensions  extends Io{

// };


interface IExtensionTypes {
  [name: string]: string
}

export const MediaExtensionTypes: IExtensionTypes = {
  '.jpg': MediaType.PHOTO,
  '.png': MediaType.PHOTO,
  '.bmp': MediaType.PHOTO,
  '.webp': MediaType.PHOTO,
  '.tiff': MediaType.PHOTO,

  '.cr2': MediaType.PHOTO_RAW,
  '.nef': MediaType.PHOTO_RAW,
};