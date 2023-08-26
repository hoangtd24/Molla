import { User } from "../entities/User";
import { RegisterInput } from "../types/inputTypes/RegisterInput";
import { UserMutationResponse } from "../types/UserMutationResponse";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { LoginInput } from "../types/inputTypes/LoginInput";
import { createToken, sendRefreshToken } from "../utils/createToken";
import { Context } from "../types/Context";
import { checkAuth } from "../middleware/checkAuth";

@Resolver()
export class UserResolver {
  @Mutation((_returns) => UserMutationResponse)
  async register(
    @Arg("registerInput") { email, password, username }: RegisterInput
  ): Promise<UserMutationResponse> {
    try {
      const existingUser = await User.findOneBy({ email });
      if (existingUser) {
        return {
          code: 400,
          success: false,
          message: "User already register",
        };
      }
      const hashPassword = await argon2.hash(password);
      const newUser = User.create({
        username,
        email,
        password: hashPassword,
      });
      await newUser.save();
      return {
        code: 200,
        success: true,
        message: "Register user successfully",
        user: newUser,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        message: `Internal server error ${error.message}`,
      };
    }
  }

  @Mutation((_returns) => UserMutationResponse)
  async login(
    @Arg("loginInput") { email, password }: LoginInput,
    @Ctx() { res }: Context
  ): Promise<UserMutationResponse> {
    const existingUser = await User.findOne({
      where: { email },
      relations: {
        cart: {
          product: true,
        },
      },
    });
    if (!existingUser) {
      return {
        code: 400,
        success: false,
        message: "Email or password incorrect",
      };
    }
    const verified = await argon2.verify(existingUser.password, password);
    if (!verified) {
      return {
        code: 400,
        success: false,
        message: "Email or password incorrect",
      };
    }
    sendRefreshToken(res, existingUser);

    return {
      code: 200,
      success: true,
      message: "Login successfully",
      user: existingUser,
      accessToken: createToken("accessToken", existingUser),
    };
  }

  @Mutation((_returns) => UserMutationResponse)
  async logout(@Ctx() { res }: Context): Promise<UserMutationResponse> {
    res.clearCookie(process.env.REFRESH_TOKEN_NAME as string);

    return {
      code: 200,
      success: true,
      message: "Logout successfully",
    };
  }

  @Query((_return) => UserMutationResponse)
  @UseMiddleware(checkAuth)
  async me(@Ctx() { user }: Context): Promise<UserMutationResponse> {
    try {
      const existingUser = (await User.findOne({
        where: {
          id: user?.userId,
        },
        relations: {
          cart: {
            product: true,
          },
        },
      })) as User;
      return {
        code: 200,
        success: true,
        message: "Load user successfully",
        user: existingUser,
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
