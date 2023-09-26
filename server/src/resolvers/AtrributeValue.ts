import { AttributeValue } from "../entities/AttributeValue";
import { Arg, Mutation, Resolver } from "type-graphql";
import { AttributeValueInput } from "../types/inputTypes/AttributeValueInput";
import { Attribute } from "../entities/Attribute";

@Resolver()
export class AttributeValueResolver {
  @Mutation(() => AttributeValue)
  async createAttributeVal(
    @Arg("attributeValueInput") { attrId, code, value }: AttributeValueInput
  ): Promise<AttributeValue> {
    const existingAttribute = (await Attribute.findOneBy({
      id: attrId,
    })) as Attribute;
    console.log("existingAttribute", existingAttribute);
    const newAtrributeValue = AttributeValue.create({
      attri: existingAttribute,
      value,
      code,
    });
    await newAtrributeValue.save();
    return newAtrributeValue;
  }
}
