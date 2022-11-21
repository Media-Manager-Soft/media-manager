import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "./Media";
import { LocationService } from "../Services/LocationService";

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @OneToMany(() => Media, media => media.location)
  media: Media[];

  @Column({type: "int", default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;

  pathExists?: boolean;

  public service() {
    return new LocationService(this)
  }

}
