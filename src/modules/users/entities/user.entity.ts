import { ObjectType, Field, Int } from '@nestjs/graphql';
import Role from 'src/modules/enums/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
//import {Comment} from 'src/modules/comment/comment.entity'
import { OneToMany } from 'typeorm';
import { Session } from 'src/modules/session/session.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.ADMIN,
  })
  @Field()
  role: Role;
  //@OneToMany(() => Comment, (comment) => comment.user)
 // comments: Comment[];
  @OneToMany(() => Session, session => session.user) // Define the relationship here
  sessions: Session[];
}
