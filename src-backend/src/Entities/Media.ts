import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Location} from "./Location";
import {MediaService} from "../Services/Media/Metadata/MediaService";
import {IConverter} from "../Services/Converters/IConverter";
import {MediaType} from "../Enums/MediaType";
import {PhotoConverter} from "../Services/Converters/PhotoConverter";
import {PhotoRawConverter} from "../Services/Converters/PhotoRawConverter";
import {VideoConverter} from "../Services/Converters/VideoConverter";
import * as fs from "fs";
import {Thumbnail} from "./Thumbnail";
import moment = require("moment");
import {Moment} from "moment";
import {HeicConverter} from "../Services/Converters/HeicConverter";

const path = require('path');

@Entity()
export class Media extends BaseEntity {

  //TODO: move to method
  private _mediaService: MediaService | undefined;

  static THUMB_WIDTH: number = 400;

  static UPDATABLE_COLUMNS = ['type', 'size', 'width', 'height', 'camera', 'cameraModel', 'latitude', 'longitude', 'takenAt', 'originalPath']

  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Location, location => location.media)
  location: Location;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  type: string;

  @Column({nullable: true})
  size: number;

  @Column({type: "int", nullable: true})
  rating: number

  @Column({type: "boolean", default: false})
  favorite: boolean

  @Column({default: 0})
  flag: -1 | 0 | 1

  @Column({type: "int", nullable: true})
  width: number;

  @Column({type: "int", nullable: true})
  height: number;

  @Column({nullable: true})
  orientation?: number;

  @Column({nullable: true})
  camera: string;

  @Column({nullable: true})
  cameraModel: string;

  @Column({nullable: true})
  uniqueHash: string;

  @Column({nullable: true})
  latitude: string;

  @Column({nullable: true})
  longitude: string;

  @Column({nullable: true, type: 'datetime'})
  takenAt: string | null | undefined;

  @Column({default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;

  @Column({default: () => "CURRENT_TIMESTAMP"})
  updatedAt: Date;

  originalPath: string;

  get mediaService() {
    if (!this._mediaService) {
      this._mediaService = new MediaService(this);
    }
    return this._mediaService;
  }

  getMomentTakenAt(): Moment {
    return moment(this.takenAt);
  }

  getPathToFile() {
    return path.join(this.location.path, this.path, this.filename)
  }

  fileExists() {
    return fs.existsSync(this.getPathToFile())
  }

  removeWithThumb() {
    Thumbnail.delete({mediaId: this.id})
    this.remove()
  }

  converter(): IConverter {
    //Todo: refactor needed
    switch (this.type) {
      case MediaType.PHOTO:
        return new PhotoConverter(this)
      case MediaType.PHOTO_RAW:
        return new PhotoRawConverter(this)
      case MediaType.VIDEO:
        return new VideoConverter(this)
      case MediaType.HEIC:
        return new HeicConverter(this)
    }
    throw new Error('Undefined type of given media')
    // return new PhotoConverter(this)
    // const className = this.type + "Converter";
    // return new (<any>global)[className]()();
    // return new (<any>'Converters')[/**/this.type + "Converter"]()
  }
}
