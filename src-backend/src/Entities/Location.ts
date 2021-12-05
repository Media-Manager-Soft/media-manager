import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({type: "int", default: () => "CURRENT_TIMESTAMP"})
  public createdAt: Date;

}
