import { CartInput } from "../types/inputTypes/CartInput";
import { CartResponse } from "../types/CartResponse";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../types/Context";
import { Cart } from "../entities/Cart";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { checkAuth } from "../middleware/checkAuth";
import { AppDataSource } from "..";

@Resolver()
export class CartResolver {
  @Mutation(() => CartResponse)
  @UseMiddleware(checkAuth)
  async createCart(
    @Arg("cartInput") { productId, quantity }: CartInput,
    @Ctx() { user }: Context
  ): Promise<CartResponse> {
    try {
      const existingCart = await Cart.findOne({
        where: {
          user: {
            id: user?.userId,
          },
          product: {
            id: productId,
          },
        },
        relations: {
          user: true,
          product: true,
        },
      });
      if (existingCart) {
        existingCart.qty = existingCart.qty + quantity;
        existingCart.save();
        return {
          code: 200,
          success: true,
          message: "Cart added successfully",
          cart: existingCart,
        };
      }
      const existingUser = (await User.findOneBy({ id: user?.userId })) as User;
      const existingProduct = (await Product.findOneBy({
        id: productId,
      })) as Product;

      const newCart = Cart.create({
        user: existingUser,
        product: existingProduct,
        qty: quantity,
      });
      newCart.save();
      return {
        code: 200,
        success: true,
        message: "Cart added successfully",
        cart: newCart,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: error.message,
      };
    }
  }

  @Mutation(() => CartResponse)
  @UseMiddleware(checkAuth)
  async delCart(@Arg("cartId") cartId: number): Promise<CartResponse> {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Cart)
      .where("id = :id", { id: cartId })
      .execute();
    return {
      code: 200,
      success: true,
      message: "cart deleted successfully",
    };
  }
}
