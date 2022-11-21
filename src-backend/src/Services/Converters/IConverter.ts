import {Media} from "../../Entities/Media";

/**
 * NOTICE! Remember to handle type in frontend
 */
export interface IConverter {

  media: Media;

  retrieveThumb(): Promise<any>

  full(): Promise<any> | string
}
