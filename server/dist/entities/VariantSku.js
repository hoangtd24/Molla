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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantSku = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Sku_1 = require("./Sku");
const AttributeValue_1 = require("./AttributeValue");
let VariantSku = exports.VariantSku = class VariantSku extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VariantSku.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Sku_1.Sku),
    (0, typeorm_1.ManyToOne)(() => Sku_1.Sku),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Sku_1.Sku)
], VariantSku.prototype, "sku", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => AttributeValue_1.AttributeValue),
    (0, typeorm_1.ManyToOne)(() => AttributeValue_1.AttributeValue),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", AttributeValue_1.AttributeValue)
], VariantSku.prototype, "attributeValue", void 0);
exports.VariantSku = VariantSku = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], VariantSku);
//# sourceMappingURL=VariantSku.js.map