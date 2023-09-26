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
exports.AttributeResolver = void 0;
const Attribute_1 = require("../entities/Attribute");
const type_graphql_1 = require("type-graphql");
let AttributeResolver = exports.AttributeResolver = class AttributeResolver {
    async createAttribute(name) {
        const newAtrri = Attribute_1.Attribute.create({
            name: name,
        });
        await newAtrri.save();
        return newAtrri;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Attribute_1.Attribute),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttributeResolver.prototype, "createAttribute", null);
exports.AttributeResolver = AttributeResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AttributeResolver);
//# sourceMappingURL=Atrribute%20copy.js.map