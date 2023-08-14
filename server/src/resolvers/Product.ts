import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "..";
import { Category } from "../entities/Category";
import { Discount } from "../entities/Discount";
import { Product } from "../entities/Product";
import { ProductInput } from "../types/inputTypes/ProductInput";
import { ProductMutationResponse } from "../types/ProductResponse";

@Resolver()
export class ProductResolver {
  @Mutation((_returns) => ProductMutationResponse)
  async createProduct(
    @Arg("productInput")
    { categories, images, name, price, discount }: ProductInput
  ): Promise<ProductMutationResponse> {
    try {
      const existingCategory = await AppDataSource.getRepository(Category)
        .createQueryBuilder("category")
        .where("category.id IN (:...categories)", { categories: categories })
        .getMany();

      let newProduct;
      if (!discount) {
        newProduct = Product.create({
          name,
          categories: existingCategory,
          images,
          price,
        });
      } else {
        const existingDiscount = (await Discount.findOneBy({
          id: discount,
        })) as Discount;
        newProduct = Product.create({
          name,
          categories: existingCategory,
          images,
          price,
          discount: existingDiscount,
        });
      }
      await newProduct.save();
      return {
        code: 200,
        success: true,
        message: "created product successfully",
        product: newProduct,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: error.message,
      };
    }
  }

  @Query((_returns) => [Product])
  async getProduct(): Promise<Product[]> {
    const products = await Product.find({});
    return products;
  }
}
