import { Media } from "../../../Entities/Media";
import { Location } from "../../../Entities/Location";
import { MetadataService } from "./MetadataService";
import { Thumbnail } from "../../../Entities/Thumbnail";
import { ImgConverter } from "../../Img/ImgConverter";


export class MediaService {
  private mediaMetadataService: MetadataService;
  private location: Location;

  constructor(private media: Media) {
    this.mediaMetadataService = new MetadataService()
  }

  public async discoverMetadata(pathToFile: string, location: Location) {

    await this.mediaMetadataService.setFile(this.media, pathToFile, location);

    this.location = location;
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
      console.error(e)
    }
  }

  async storeThumb() {
    // if (!this.media.hasThumb()) {
    let thumb: Thumbnail | undefined = await Thumbnail.findOne({mediaId: this.media.id});

    if (thumb === undefined) {
      thumb = new Thumbnail();
    }

    thumb.mediaId = this.media.id;
    try {
      const buffer = await this.media.converter().retrieveThumb();
      thumb.thumbnail = await ImgConverter.setData(buffer)
        .resizeToThumb()
        .toJpg({quality: 60, progressive: true})
        .toBuffer()
      await thumb.save({transaction: false});
    } catch (e) {
      console.error(e);
    }
    return thumb;
    // }
  }

  async shouldBeImported(): Promise<Media | null> {
    const media = await Media.findOne({
      where: {
        checkSum: this.media.checkSum,
        location: this.location,
      },
      relations: ['location']
    })

    if (media !== undefined) {
      return media.fileExists() ? media : null;
    }

    return null;
  }
}
