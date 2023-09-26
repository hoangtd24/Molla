import { Sku } from "../entities/Sku";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Product } from "../entities/Product";

@Resolver()
export class SkuResolver {
  @Mutation(() => Sku)
  async createSku(@Arg("productId") productId: number): Promise<Sku> {
    const product = (await Product.findOneBy({ id: productId })) as Product;
    const newSku = Sku.create({
      product,
    });
    await newSku.save();
    return newSku;
  }
}
