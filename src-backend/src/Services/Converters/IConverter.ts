import { Media } from "../../Entities/Media";


export interface IConverter {
  media:Media;
  retrieveThumb(): Promise<any>
  full(): Promise<any> | string
}
