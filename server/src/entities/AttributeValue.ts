import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attribute } from "./Attribute";

@ObjectType()
@Entity()
export class AttributeValue extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Attribute)
  @ManyToOne(() => Attribute)
  @JoinColumn()
  attri: Attribute;

  @Field()
  @Column()
  value: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  code?: string;
}
