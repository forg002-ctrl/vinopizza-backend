import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv/config";
import menuRouter from "./routers/home.js";//?
import mealRouter from "./routers/drinks.js";//?
import drinkRouter from "./routers/drinks.js";//?
import categoryRouter from "./routers/category.js";
import orderRouter from "./routers/orders.js";
import authorizationRouter from "./routers/authorization.js"

import apiErrorHandler from "./midllewares/error-middleware.js";

const app = express();
const PORT = process.env.Port;
const DB_URL = process.env.Database_URL;

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use(cors());
app.use(cookieParser());

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