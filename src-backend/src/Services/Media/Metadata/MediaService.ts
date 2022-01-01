import { Media } from "../../../Entities/Media";
import { Location } from "../../../Entities/Location";
import { MediaMetadataService } from "./MediaMetadataService";

export class MediaService {
  private mediaMetadataService: MediaMetadataService;

  constructor(private media: Media) {
    this.mediaMetadataService = new MediaMetadataService()
  }

  public async discoverMetadata(pathToFile: string, location: Location) {

    await this.mediaMetadataService.setFile(this.media, pathToFile, location);

    this.media.path = this.mediaMetadataService.getFilePathInLocation();
    this.media.filename = this.mediaMetadataService.getFileName();
    this.media.type = this.mediaMetadataService.getFileType();

    this.media.cameraModel = this.mediaMetadataService.getCameraModel();
    this.media.camera = this.mediaMetadataService.getCameraManufacturer();
    this.media.height = this.mediaMetadataService.getHeight();
    this.media.width = this.mediaMetadataService.getWidth();
    this.media.latitude = this.mediaMetadataService.getLatitude();
    this.media.longitude = this.mediaMetadataService.getLongitude();
    this.media.orientation = await this.mediaMetadataService.getOrientation();
    this.media.takenAt = this.mediaMetadataService.getTakenAt();

    await this.mediaMetadataService.storeThumb();
  }


}
