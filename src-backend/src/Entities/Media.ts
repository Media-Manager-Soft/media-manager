import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./Location";
import { MetadataService } from "../Services/Media/Metadata/MetadataService";
const path = require('path');

export enum MediaType {
  PHOTO = "photo",
  VIDEO = "video",
  PHOTO_RAW = "photo_raw",
}


@Entity()
export class Media extends BaseEntity {

  private _mediaService: MetadataService | undefined;

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

  @Column({type: "int", default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;

  @Column({type: "int", default: () => "CURRENT_TIMESTAMP"})
  updatedAt: Date;


  public get metadataService() {
    if (!this._mediaService) {
      this._mediaService = new MetadataService(this);
    }
    return this._mediaService;
  }

  public getPathToFile() {
    return path.join(this.location.path, this.path, this.filename)
  }
}
