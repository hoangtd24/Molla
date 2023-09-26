import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sku } from "./Sku";
import { AttributeValue } from "./AttributeValue";

@ObjectType()
@Entity()
export class VariantSku extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Sku)
  @ManyToOne(() => Sku)
  @JoinColumn()
  sku: Sku;

  @Field(() => AttributeValue)
  @ManyToOne(() => AttributeValue)
  @JoinColumn()
  attributeValue: AttributeValue;
}
