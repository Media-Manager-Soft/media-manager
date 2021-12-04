import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text")
  description: string;

  @Column("text")
  filename: string;

  @Column()
  views: number;

  @Column()
  isPublished: boolean;
  @Column({nullable: true})
  isAsd: boolean;
}
