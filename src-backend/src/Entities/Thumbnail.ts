import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Thumbnail extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({type: "blob", nullable: true})
  thumbnail: ArrayBuffer | Buffer | Uint8Array | undefined;
}
