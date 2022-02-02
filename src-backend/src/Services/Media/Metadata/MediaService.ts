import { Media } from "../../../Entities/Media";
import { Location } from "../../../Entities/Location";
import { MetadataService } from "./MetadataService";

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

    await this.mediaMetadataService.storeThumb();
  }


}
