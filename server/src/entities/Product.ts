import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Category } from "./Category";
import { Discount } from "./Discount";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  price: number;

  @Field(() => Discount, { nullable: true })
  @ManyToOne(() => Discount, { nullable: true })
  @JoinColumn()
  discount: Discount;

  @Field((_type) => [String])
  @Column("text", { array: true })
  images: string[];

  @Field(() => [Category])
  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
