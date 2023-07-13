import { Entity, Column, PrimaryGeneratedColumn,OneToOne,JoinColumn} from 'typeorm';

@Entity()
export class MetaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  metaTitle: string;

  @Column()
  metaDescription: string;
  
  @OneToOne(() => MetaEntity)
  @JoinColumn()
  meta: MetaEntity;
}
