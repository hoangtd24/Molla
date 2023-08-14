import { Field, ObjectType } from "type-graphql";
import { MutationResponse } from "./MutationResponse";
import { Product } from "../entities/Product";

@ObjectType({ implements: MutationResponse })
export class ProductMutationResponse extends MutationResponse {
  @Field({ nullable: true })
  product?: Product;
}
