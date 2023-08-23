import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Product } from "../entities/Product";
import { Review } from "../entities/Review";
import { User } from "../entities/User";
import { ReviewResponse } from "../types/ReviewResponse";
import { ReviewInput } from "../types/inputTypes/ReviewInput";
import { checkAuth } from "../middleware/checkAuth";
import { Context } from "../types/Context";

@Resolver()
export class ReviewResolver {
  @UseMiddleware(checkAuth)
  @Mutation((_returns) => ReviewResponse)
  async createReview(
    @Arg("reviewInput") { rating, content, productId }: ReviewInput,
    @Ctx() { user }: Context
  ): Promise<ReviewResponse> {
    try {
      const existingUser = (await User.findOneBy({ id: user?.userId })) as User;
      const product = (await Product.findOneBy({ id: productId })) as Product;
      const newReview = Review.create({
        user: existingUser,
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
