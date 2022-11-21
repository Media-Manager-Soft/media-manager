import {MediaType} from "../Enums/MediaType";

export class OrientationHelper {


  static translate(originalValue: number, mediaType: string) {

    let value = parseInt(originalValue.toString());

    if (mediaType === MediaType.HEIC || mediaType === MediaType.VIDEO) {
      return;
    }

    if (value >= 0 && value <= 8) {
      switch (value) {
        case 1: {
          return 0;
        }
        case 2: {
          return 0;
        }
        case 3: {
          return 180;
        }
        case 4: {
          return 180;
        }
        case 5: {
          return 90;
        }
        case 6: {
          return 90;
        }
        case 7: {
          return 270;
        }
        case 8: {
          return 270;
        }


        default: {
          return 0;
        }
      }
    } else {
      return value;
    }

  }
}
