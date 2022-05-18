import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv/config";
import menuRouter from "./routers/menu.js";//?
import mealRouter from "./routers/meal.js";//?
import drinkRouter from "./routers/drinks.js";//?
import categoryRouter from "./routers/category.js";
import orderRouter from "./routers/orders.js";
import authorizationRouter from "./routers/authorization.js"

import apiErrorHandler from "./midllewares/error-middleware.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VinoPizza API",
      version: "1.0.0",
      description: "Express Library API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      }
    ]
  },
  apis: ["./routers/*.js"],
}

const specs = swaggerJSDoc(options);

const app = express();
const PORT = process.env.Port || 5000;
const DB_URL = process.env.Database_URL;

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use(cors());
app.use(cookieParser());
app.use("/api/v1/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/drinks", drinkRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/authorization", authorizationRouter);

app.use(apiErrorHandler);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () =>
      console.log(`server running on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

startApp();