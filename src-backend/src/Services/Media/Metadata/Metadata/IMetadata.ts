export interface IMetadata {

  get model(): string;

  get make(): string;

  get imageHeight(): string;

  get imageWidth(): string

  get dateTimeOriginal(): Date | null;

  get latitude(): string;

  get longitude(): string;

  get orientation(): number;
}
