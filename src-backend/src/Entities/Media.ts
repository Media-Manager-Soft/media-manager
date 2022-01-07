import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./Location";
import { MediaService } from "../Services/Media/Metadata/MediaService";
import { Thumbnail } from "./Thumbnail";
import { IConverter } from "../Services/Converters/IConverter";
import { MediaType } from "../Enums/MediaType";
import { PhotoConverter } from "../Services/Converters/PhotoConverter";
import { PhotoRawConverter } from "../Services/Converters/PhotoRawConverter";
import { VideoConverter } from "../Services/Converters/VideoConverter";

const path = require('path');

@Entity()
export class Media extends BaseEntity {

  //TODO: move to method
  private _mediaService: MediaService | undefined;

  static THUMB_WIDTH: number = 200;

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

  @Column({type: "int", nullable: true})
  rating: number

  @Column({type: "int", nullable: true})
  flag: number

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
  latitude: string;

  @Column({nullable: true})
  longitude: string;

  @Column({nullable: true})
  takenAt: Date;

  @Column({default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;

  @Column({default: () => "CURRENT_TIMESTAMP"})
  updatedAt: Date;

  @OneToOne(() => Thumbnail)
  @JoinColumn()
  thumbnail: Thumbnail;

  get mediaService() {
    if (!this._mediaService) {
      this._mediaService = new MediaService(this);
    }
    return this._mediaService;
  }

  getPathToFile() {
    return path.join(this.location.path, this.path, this.filename)
  }

  hasThumb() {
    return !!this.thumbnail;
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
    }

    return new PhotoConverter(this)
    // const className = this.type + "Converter";
    // return new (<any>global)[className]()();
    // return new (<any>'Converters')[/**/this.type + "Converter"]()
  }
}
