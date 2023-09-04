import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { In } from "typeorm";
import { Cart } from "../entities/Cart";
import { Order } from "../entities/Order";
import { Payment } from "../entities/Payment";
import { User } from "../entities/User";
import { checkAuth } from "../middleware/checkAuth";
import { Context } from "../types/Context";
import { OrderResponse } from "../types/OrderResponse";
import { OrderInput } from "../types/inputTypes/OrderInput";

@Resolver()
export class OrderResolver {
  @UseMiddleware(checkAuth)
  @Mutation(() => OrderResponse)
  async createOrder(
    @Arg("orderInput")
    { address, cartId, email, paymentId, phone, total, username }: OrderInput,
    @Ctx() { user }: Context
  ): Promise<OrderResponse> {
    const carts = await Cart.find({
      where: {
        id: In(cartId),
      },
      relations: {
        product: true,
      },
    });
    const existingUser = (await User.findOneBy({ id: user?.userId })) as User;
    const payment = (await Payment.findOneBy({ id: paymentId })) as Payment;
    const newOrder = Order.create({
      username,
      email,
      phone,
      address,
      carts,
      total,
      payment,
      user: existingUser,
    });
    await newOrder.save();
    return {
      code: 200,
      success: true,
      message: "Order created successfully",
      order: newOrder,
    };
  }

  @Query(() => Order, { nullable: true })
  @UseMiddleware(checkAuth)
  async getOrder(
    @Ctx() { user }: Context,
    @Arg("orderId") orderId: number
  ): Promise<Order | null> {
    const existingOrder = await Order.findOne({
      where: {
        id: orderId,
        user: {
          id: user?.userId,
        },
      },
      withDeleted: true,
      relations: {
        carts: {
          product: {
            discount: true,
          },
        },
        payment: true,
      },
    });
    if (!existingOrder) {
      return null;
    }
    return existingOrder;
  }
}
