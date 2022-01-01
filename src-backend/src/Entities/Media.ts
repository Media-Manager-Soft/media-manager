import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./Location";
import { MediaService } from "../Services/Media/Metadata/MediaService";
import { Thumbnail } from "./Thumbnail";

const path = require('path');

@Entity()
export class Media extends BaseEntity {

  private _mediaService: MediaService | undefined;

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

  public get mediaService() {
    if (!this._mediaService) {
      this._mediaService = new MediaService(this);
    }
    return this._mediaService;
  }

  public getPathToFile() {
    return path.join(this.location.path, this.path, this.filename)
  }

  public hasThumb(){
    return !!this.thumbnail;
  }
}
