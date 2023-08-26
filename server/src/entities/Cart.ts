import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@ObjectType()
@Entity()
export class Cart extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Product)
  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;

  @Field()
  @Column()
  qty: number;

  
  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  total: number;
}
