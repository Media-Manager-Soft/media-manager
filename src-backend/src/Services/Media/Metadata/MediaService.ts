import {Media} from "../../../Entities/Media";
import {Location} from "../../../Entities/Location";
import {MetadataService} from "./MetadataService";
import {Thumbnail} from "../../../Entities/Thumbnail";
import {ImgConverter} from "../../Img/ImgConverter";
import {PathHelper} from "../../../Helpers/helpers";
import {OrientationHelper} from "../../../Helpers/OrientationHelper";

const fs = require('fs');
const path = require('path');

const bus = require('./../../../Events/eventBus');

export class MediaService {
  private mediaMetadataService: MetadataService;

  constructor(private media: Media) {
    this.mediaMetadataService = new MetadataService()
  }

  public async discoverMetadata(pathToFile: string, location: Location) {

    this.media.originalPath = pathToFile;

    this.media.location = location;

    await this.mediaMetadataService.setFile(this.media);

    this.media.path = this.mediaMetadataService.getFilePathInLocation();
    this.media.filename = this.mediaMetadataService.getFileName();

      this.media.cameraModel = this.mediaMetadataService.getCameraModel();
      this.media.camera = this.mediaMetadataService.getCameraManufacturer();
      this.media.height = this.mediaMetadataService.getHeight();
      this.media.width = this.mediaMetadataService.getWidth();
      this.media.latitude = this.mediaMetadataService.getLatitude();
      this.media.longitude = this.mediaMetadataService.getLongitude();
      this.media.orientation = this.mediaMetadataService.getOrientation();
      this.media.takenAt = this.mediaMetadataService.getTakenAt();
      this.media.size = this.mediaMetadataService.getFileSize();
      this.media.uniqueHash = await this.generateUniqueHash();
  }

  async copyOrMoveFileToLocation(action: 'move' | 'copy') {
    let takenAt = this.media.getMomentTakenAt()

    let dir = !this.media.takenAt
      ? path.join(this.media.location.path, 'No_date')
      : path.join(this.media.location.path, takenAt.year().toString(), takenAt.format("MM"), takenAt.format('DD').toString());

    let newPath = path.join(dir, this.media.filename)

    PathHelper.ensurePathExists(dir);

    if (fs.existsSync(newPath)) {
      this.media.filename = PathHelper.addSuffixForDuplicatedFile(this.media.filename);
      newPath = path.join(dir, this.media.filename)
    }

    try {
      await this[action](this.media.originalPath, newPath)
      this.media.originalPath = newPath;
      this.media.path = this.mediaMetadataService.getFilePathInLocation();
    } catch (err: any) {
      bus.emit('error-bag', {
        filename: this.media.filename,
        error: err.message
      })
      console.error(err)
    }
  }

  async move(from: string, to: string) {
    await fs.renameSync(from, to);
  }

  async copy(from: string, to: string) {
    await fs.copyFileSync(from, to);
  }

  async storeThumb() {
    // if (!this.media.hasThumb()) {

    if (!this.media.fileExists()) {
      return;
    }

    let thumb: Thumbnail | undefined = await Thumbnail.findOne({mediaId: this.media.id});

    if (thumb === undefined) {
      thumb = new Thumbnail();
    }

    thumb.mediaId = this.media.id;
    try {
      const buffer = await this.media.converter().retrieveThumb();
      thumb.thumbnail = await ImgConverter.setData(buffer)
        .resizeToThumb()
        .rotate(OrientationHelper.translate(this.media.orientation ?? 0, this.media.type))
        .toJpg({quality: 60, progressive: true})
        .toBuffer()
      thumb.locationId = this.media.location.id;
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
        uniqueHash: this.media.uniqueHash,
      },
      relations: ['location']
    })

    if (media !== undefined) {
      return media.fileExists() ? media : null;
    }

    return null;
  }

  async generateUniqueHash() {
    const checksum = require('checksum');
    // const fs = require('fs');
    const data = {
      size: this.media.size,
      locationId: this.media.location.id,
      camera: this.media.camera,
      cameraModel: this.media.cameraModel,
      cameraMake: this.media.camera,
      orientation: this.media.orientation,
      // @ts-ignore
      takenAt: this.media.takenAt,
      // modifyTime: fs.statSync(this.media.originalPath).mtime,
    }
    return await checksum(JSON.stringify(data))
  }
}
