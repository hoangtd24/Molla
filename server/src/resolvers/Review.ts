import { Arg, Mutation, Resolver } from "type-graphql";
import { Product } from "../entities/Product";
import { Review } from "../entities/Review";
import { User } from "../entities/User";
import { ReviewResponse } from "../types/ReviewResponse";
import { ReviewInput } from "../types/inputTypes/ReviewInput";

@Resolver()
export class ReviewResolver {
  @Mutation((_returns) => ReviewResponse)
  async createReview(
    @Arg("reviewInput") { userId, rating, content, productId }: ReviewInput
  ): Promise<ReviewResponse> {
    try {
      const user = (await User.findOneBy({ id: userId })) as User;
      const product = (await Product.findOneBy({ id: productId })) as Product;
      const newReview = Review.create({
        user,
        product,
        content,
        rating,
      });
      await newReview.save();

      return {
        code: 200,
        success: true,
        message: "create review successfully",
        review: newReview,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: error.message,
      };
    }
  }
}
