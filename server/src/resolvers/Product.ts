import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "..";
import { Category } from "../entities/Category";
import { Discount } from "../entities/Discount";
import { Product } from "../entities/Product";
import { ProductInput } from "../types/inputTypes/ProductInput";
import { ProductMutationResponse } from "../types/ProductResponse";
import { GetProductArg } from "../types/argTypes/GetProductArg";
import { IsNull, Not } from "typeorm";

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
  async getProducts(
    @Args() { skip, category, sale }: GetProductArg
  ): Promise<Product[]> {
    const findOptions: { [key in string]: any } = {
      take: 10,
      relations: {
        discount: true,
      },
    };
    if (skip) {
      findOptions.skip = skip;
    }
    if (category) {
      findOptions.where = {
        categories: {
          id: category,
        },
      };
    }
    if (sale) {
      findOptions.where = {
        ...findOptions.where,
        discount: {
          id: Not(IsNull()),
        },
      };
    }
    const products = await Product.find(findOptions);
    return products;
  }

  @Query((_returns) => ProductMutationResponse)
  async detailProduct(@Arg("id") id: number): Promise<ProductMutationResponse> {
    try {
      const product = (await Product.findOne({
        where: {
          id: id,
        },
        relations: {
          discount: true,
          categories: true,
        },
      })) as Product;
      const products = await Product.find({
        where: {
          categories: product.categories.map((product) => {
            return { id: product.id };
          }),
        },
      });
      return {
        code: 200,
        success: true,
        message: "Get product information successfully",
        product: product,
        relatedProduct: products,
      };
    } catch (error) {
      return {
        code: 200,
        success: true,
        message: error.message,
      };
    }
  }
}
