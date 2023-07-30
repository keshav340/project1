import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import Role from 'src/modules/enums/roles.enum';
import {Comment} from 'src/modules/comment/comment.entity'



@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  /*@Column({ nullable: false, default: '' })
  @Field()
  firstName: string;
  */

  @Column({ nullable: false, default: '' })
  @Field()
  username: string;

  @Column({ nullable: false, default: '' })
  @Field()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.ADMIN,
  })
  @Field()
  role: Role;
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
  
}
