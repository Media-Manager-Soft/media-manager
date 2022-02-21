import { Media } from "../../../Entities/Media";
import { Location } from "../../../Entities/Location";
import { MetadataService } from "./MetadataService";
import { Thumbnail } from "../../../Entities/Thumbnail";
import { ImgConverter } from "../../Img/ImgConverter";

// const sharp = require('sharp');


export class MediaService {
  private mediaMetadataService: MetadataService;

  constructor(private media: Media) {
    this.mediaMetadataService = new MetadataService()
  }

  public async discoverMetadata(pathToFile: string, location: Location) {

    await this.mediaMetadataService.setFile(this.media, pathToFile, location);

    this.media.path = this.mediaMetadataService.getFilePathInLocation();
    this.media.filename = this.mediaMetadataService.getFileName();

    try {
      this.media.cameraModel = this.mediaMetadataService.getCameraModel();
      this.media.camera = this.mediaMetadataService.getCameraManufacturer();
      this.media.height = this.mediaMetadataService.getHeight();
      this.media.width = this.mediaMetadataService.getWidth();
      this.media.latitude = this.mediaMetadataService.getLatitude();
      this.media.longitude = this.mediaMetadataService.getLongitude();
      this.media.orientation = this.mediaMetadataService.getOrientation();
      this.media.takenAt = this.mediaMetadataService.getTakenAt();
      this.media.size = this.mediaMetadataService.getFileSize();
    } catch (e) {
    }
  }

  async storeThumb() {
    // if (!this.media.hasThumb()) {
    let thumb: Thumbnail = new Thumbnail()
    thumb.mediaId = this.media.id;
    try {
      const buffer = await this.media.converter().retrieveThumb();
      // thumb.thumbnail = await sharp(buffer)
      //   .resize(Media.THUMB_WIDTH)
      //   .jpeg({quality: 60, progressive: true})
      thumb.thumbnail = await ImgConverter.setData(buffer)
        .resizeToThumb()
        .toJpg({quality: 60, progressive: true})
        .toBuffer()
    } catch (e) {
      console.error(e);
      return;
    }
    await thumb.save({transaction: false});
    return thumb;
    // }
  }
}
