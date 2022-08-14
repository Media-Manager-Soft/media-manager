export class OrientationHelper {


  static translate(value: number) {

    if (value > 8) {
      return value;
    }

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
  }
}
