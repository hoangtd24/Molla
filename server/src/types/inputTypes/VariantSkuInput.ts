import { Field, InputType } from "type-graphql";

@InputType()
export class VariantSkuInput {
  @Field()
  skuId: number;

  @Field()
  attrValueId: number;
}
