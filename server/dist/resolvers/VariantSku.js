"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantSkuResolver = void 0;
const AttributeValue_1 = require("../entities/AttributeValue");
const VariantSkuInput_1 = require("../types/inputTypes/VariantSkuInput");
const type_graphql_1 = require("type-graphql");
const Sku_1 = require("../entities/Sku");
const VariantSku_1 = require("../entities/VariantSku");
let VariantSkuResolver = exports.VariantSkuResolver = class VariantSkuResolver {
    async createVariantSku({ attrValueId, skuId }) {
        const sku = (await Sku_1.Sku.findOneBy({ id: skuId }));
        const attributeValue = (await AttributeValue_1.AttributeValue.findOneBy({
            id: attrValueId,
        }));
        const newVariantSku = VariantSku_1.VariantSku.create({
            sku,
            attributeValue,
        });
        await newVariantSku.save();
        return newVariantSku;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => VariantSku_1.VariantSku),
    __param(0, (0, type_graphql_1.Arg)("variantSkuInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VariantSkuInput_1.VariantSkuInput]),
    __metadata("design:returntype", Promise)
], VariantSkuResolver.prototype, "createVariantSku", null);
exports.VariantSkuResolver = VariantSkuResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], VariantSkuResolver);
//# sourceMappingURL=VariantSku.js.map