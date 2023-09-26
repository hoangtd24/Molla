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
exports.AttributeValueResolver = void 0;
const AttributeValue_1 = require("../entities/AttributeValue");
const type_graphql_1 = require("type-graphql");
const AttributeValueInput_1 = require("../types/inputTypes/AttributeValueInput");
const Attribute_1 = require("../entities/Attribute");
let AttributeValueResolver = exports.AttributeValueResolver = class AttributeValueResolver {
    async createAttributeVal({ attrId, code, value }) {
        const existingAttribute = (await Attribute_1.Attribute.findOneBy({
            id: attrId,
        }));
        console.log("existingAttribute", existingAttribute);
        const newAtrributeValue = AttributeValue_1.AttributeValue.create({
            attri: existingAttribute,
            value,
            code,
        });
        await newAtrributeValue.save();
        return newAtrributeValue;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => AttributeValue_1.AttributeValue),
    __param(0, (0, type_graphql_1.Arg)("attributeValueInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AttributeValueInput_1.AttributeValueInput]),
    __metadata("design:returntype", Promise)
], AttributeValueResolver.prototype, "createAttributeVal", null);
exports.AttributeValueResolver = AttributeValueResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AttributeValueResolver);
//# sourceMappingURL=AtrributeValue.js.map