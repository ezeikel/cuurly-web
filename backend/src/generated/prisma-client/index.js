"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "CartItem",
    embedded: false
  },
  {
    name: "Item",
    embedded: false
  },
  {
    name: "Location",
    embedded: false
  },
  {
    name: "Order",
    embedded: false
  },
  {
    name: "OrderItem",
    embedded: false
  },
  {
    name: "Permission",
    embedded: false
  },
  {
    name: "Shop",
    embedded: false
  },
  {
    name: "ShopType",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();
