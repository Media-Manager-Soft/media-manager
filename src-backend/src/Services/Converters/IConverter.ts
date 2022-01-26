import { Media } from "../../Entities/Media";


export interface IConverter {
  media:Media;
  thumb(): Promise<any>
  full(): Promise<any> | string
}
