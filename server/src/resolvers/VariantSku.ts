import { AttributeValue } from "../entities/AttributeValue";
import { VariantSkuInput } from "../types/inputTypes/VariantSkuInput";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Sku } from "../entities/Sku";
import { VariantSku } from "../entities/VariantSku";

@Resolver()
export class VariantSkuResolver {
  @Mutation(() => VariantSku)
  async createVariantSku(
    @Arg("variantSkuInput") { attrValueId, skuId }: VariantSkuInput
  ): Promise<VariantSku> {
    const sku = (await Sku.findOneBy({ id: skuId })) as Sku;
    const attributeValue = (await AttributeValue.findOneBy({
      id: attrValueId,
    })) as AttributeValue;
    const newVariantSku = VariantSku.create({
      sku,
      attributeValue,
    });
    await newVariantSku.save();
    return newVariantSku;
  }
}
