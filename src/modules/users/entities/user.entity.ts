import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import Role from 'src/modules/enums/roles.enum';


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
    default: Role.USER,
  })
  @Field()
  role: Role;

}
