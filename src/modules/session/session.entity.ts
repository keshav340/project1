
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
@ObjectType()
@Entity()
export class Session {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.sessions)
  user: User;

  @Field()
  @Column()
  token: string;

  @Field()
  @Column()
  expiration: Date;
}

