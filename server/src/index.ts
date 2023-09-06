import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { GreetingResovler } from "./resolvers/Hello";

import cors from "cors";
import { Product } from "./entities/Product";
import { UserResolver } from "./resolvers/User";
import { Category } from "./entities/Category";
import { Discount } from "./entities/Discount";
import { DiscountResolver } from "./resolvers/Discount";
import { CategoryResolver } from "./resolvers/Category";
import { ProductResolver } from "./resolvers/Product";
import { Review } from "./entities/Review";
import { ReviewResolver } from "./resolvers/Review";
import { Cart } from "./entities/Cart";
import { CartResolver } from "./resolvers/Cart";
import refreshToken from "./routes/refreshToken";
import cookieParser from "cookie-parser";
import { Order } from "./entities/Order";
import { Payment } from "./entities/Payment";
import { PaymentResolver } from "./resolvers/Payment";
import { OrderResolver } from "./resolvers/Order";
import mongoose from "mongoose";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "molla",
  entities: [User, Product, Category, Discount, Review, Cart, Order, Payment],
  synchronize: true,
  logging: true,
});

const main = async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  const app = express();
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use("/refresh_token", refreshToken);

  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [
        GreetingResovler,
        UserResolver,
        DiscountResolver,
        CategoryResolver,
        ProductResolver,
        ReviewResolver,
        CartResolver,
        PaymentResolver,
        OrderResolver,
      ],
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground,
    ],
    context: ({ req, res }) => ({ req, res }),
  });
  await apolloServer.start();

  await mongoose.connect(
    `mongodb+srv://hoangtd241100:${process.env.MONGOOSE_PASS}@cluster0.4ozdp8b.mongodb.net/`
  );
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  });

  const PORT = process.env.PORT || 4000;

  await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, resolve as () => void)
  );

  // Typically, http://localhost:4000/graphql
  console.log(
    `SERVER STARTED ON PORT ${PORT}. GRAPHQL ENDPOINT ON http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
};

main();
