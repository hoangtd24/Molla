import { Attribute } from "../entities/Attribute";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class AttributeResolver {
  @Mutation(() => Attribute)
  async createAttribute(@Arg("name") name: string): Promise<Attribute> {
    const newAtrri = Attribute.create({
      name: name,
    });
    await newAtrri.save();
    return newAtrri;
  }
}
