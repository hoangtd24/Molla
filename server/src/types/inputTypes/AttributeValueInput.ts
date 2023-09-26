import { Field, InputType } from "type-graphql";

@InputType()
export class AttributeValueInput {
  @Field()
  attrId: number;

  @Field()
  value: string;

  @Field({ nullable: true })
  code?: string;
}
