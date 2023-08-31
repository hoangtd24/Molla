import {
  Arg,
  Args,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { ILike, In, IsNull, Like, Not } from "typeorm";
import { AppDataSource } from "..";
import { Category } from "../entities/Category";
import { Discount } from "../entities/Discount";
import { Product } from "../entities/Product";
import { ProductMutationResponse } from "../types/ProductResponse";
import { GetProductArg } from "../types/argTypes/GetProductArg";
import { ProductInput } from "../types/inputTypes/ProductInput";
import { Review } from "../entities/Review";
import { FilterProductArg } from "../types/argTypes/FilterProductArg";
import { FilterProductResponse } from "../types/FilterProductResponse";

@Resolver((_of) => Product)
export class ProductResolver {
  @FieldResolver()
  async averageRating(@Root() product: Product) {
    const reviews = await Review.find({
      where: {
        product: {
          id: product.id,
        },
      },
    });
    if (reviews.length === 0) {
      return 0;
    } else {
      const totalRating = reviews.reduce(
        (prevValue, currentValue) => prevValue + currentValue.rating,
        0
      );
      return (totalRating / reviews.length).toFixed(1);
    }
  }

  @FieldResolver()
  async newPrice(@Root() product: Product) {
    if (product.discount) {
      return product.price * (1 - product.discount.discount_percent / 100);
    }
    return product.price;
  }

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
          reviews: {
            user: true,
            like: true,
            dislike: true,
          },
        },
        order: {
          reviews: {
            createdAt: "DESC",
          },
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

  @Query((_returns) => [Product])
  async getProductsCart(
    @Arg("productIds", () => [Number]) productIds: number[]
  ): Promise<Product[]> {
    const products = await Product.find({
      where: {
        id: In(productIds),
      },
    });
    return products;
  }

  @Query(() => FilterProductResponse)
  async filter(
    @Args() { category, limit, page, price, search }: FilterProductArg
  ): Promise<FilterProductResponse> {
    const whereOptions: { [key in string]: any } = {};
    const orderOptions: { [key in string]: any } = {};
    if (category) {
      whereOptions.categories = {
        name: ILike(`%${category}%`),
      };
    }
    if (search) {
      whereOptions.name = ILike(`%${search}%`);
    }

    if (price) {
      orderOptions.price = price;
    }
    const products = await Product.findAndCount({
      where: whereOptions,
      skip: (page - 1) * limit,
      take: limit,
      order: orderOptions,
      relations: {
        categories: true,
      },
    });

    return {
      pages: Math.ceil(products[1] / limit),
      products: products[0],
      total: products[1],
    };
  }
}
