import { Field, ObjectType } from "type-graphql";
import { MutationResponse } from "./MutationResponse";
import { Cart } from "../entities/Cart";

@ObjectType({ implements: MutationResponse })
export class CartResponse extends MutationResponse {
  @Field({ nullable: true })
  cart?: Cart;
}
