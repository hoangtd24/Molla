import { Field, InputType } from "type-graphql";

@InputType()
export class ReviewInput {
  @Field()
  userId: number;

  @Field()
  productId: number;

  @Field()
  content: string;

  @Field()
  rating: number;
}
