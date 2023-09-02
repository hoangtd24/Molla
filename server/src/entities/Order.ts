import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Cart } from "./Cart";

@Entity()
@ObjectType()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  user: User;

  @OneToMany(() => Cart, (cart) => cart.order)
  @JoinColumn()
  @Field(() => [Cart])
  carts: Cart[];

  @Field()
  total: number;
}
