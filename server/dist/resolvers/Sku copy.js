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
exports.SkuResolver = void 0;
const Sku_1 = require("../entities/Sku");
const type_graphql_1 = require("type-graphql");
const Product_1 = require("../entities/Product");
let SkuResolver = exports.SkuResolver = class SkuResolver {
    async createSku(productId) {
        const product = (await Product_1.Product.findOneBy({ id: productId }));
        const newSku = Sku_1.Sku.create({
            product,
        });
        await newSku.save();
        return newSku;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Sku_1.Sku),
    __param(0, (0, type_graphql_1.Arg)("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SkuResolver.prototype, "createSku", null);
exports.SkuResolver = SkuResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], SkuResolver);
//# sourceMappingURL=Sku%20copy.js.map